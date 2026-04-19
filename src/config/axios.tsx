import { logout, setAccessToken } from '@/store/userSlice';
import axios, { AxiosError } from 'axios';
import { store } from '@/store/store';
import { ApiError } from '@/types/ErrorType';
import { API_BASE_URL } from '@/config';

const apiUrl = API_BASE_URL;
const api = axios.create({
  baseURL: apiUrl + "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

//Actualizar tokens de acceso
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void; }> = [];

// Interceptor de autentificación de petición antes de enviarla
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().usuario.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // If 401 error and not a retry of a refresh request itself
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }
      isRefreshing = true;
      originalRequest._isRetry = true;
      try {
        const refreshToken = store.getState().usuario.refreshToken;
        // The backend expects { refresh: token } but it's also in the cookie
        const response = await api.post("/token/refresh/", { refresh: refreshToken });

        // SimpleJWT returns tokens in response body after our backend tweak
        const { access } = response.data;

        if (!access) {
          throw new Error("No access token returned from refresh");
        }

        // 1. Update Redux state immediately
        store.dispatch(setAccessToken(access));

        // 2. Update current request header
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // 3. Resolve other queued requests
        processQueue(null, access);

        // 4. Retry current request
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        store.dispatch(logout());
        // Redirect to login if refresh fails
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other errors
    if (error.response) {
      console.log("Error de respuesta del servidor:", error.response.data);
      // Extracts message from { error: "..." }, { detail: "..." }, or the response data root if it's a string
      const message = error.response.data?.error ||
        error.response.data?.detail ||
        (typeof error.response.data === 'string' ? error.response.data : null) ||
        error.message;

      const apiError = new ApiError(message, error.response.status);
      return Promise.reject(apiError);
    }

    return Promise.reject(new ApiError("Error de conexión hacia el servidor", 0));
  }
);

export default api;
