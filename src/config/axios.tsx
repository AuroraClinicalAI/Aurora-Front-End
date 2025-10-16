import { logout, setAccessToken } from '@/store/userSlice';
import axios, {AxiosError} from 'axios';
import { store } from '@/store/store';
import { ApiError } from '@/types/ErrorType';

const apiUrl = import.meta.env.VITE_BASE_URL;
const api = axios.create({
  baseURL: apiUrl + "/api/",
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

const processQueue = (error: AxiosError | null, token:string | null = null) => {
  failedQueue.forEach(prom => {
    if (error){
      prom.reject(error);
    } else {
      prom.resolve(token)
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config!;
    // error 401 y no es el refresco del token
    if (error.response?.status === 401 && !originalRequest._isRetry){
      // Evitar multiples peticiones de refresco
      if (isRefreshing){
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject});
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }).catch(err => Promise.reject(err));
      }
      isRefreshing = true;
      originalRequest._isRetry = true;
      try {
        const refreshToken = store.getState().usuario.refreshToken;
        const response = await api.post("/token/refresh/", { refresh: refreshToken});
        const { accessToken } = response.data.access;
        // Actualizar el access token en la consulta
        store.dispatch(setAccessToken(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        // se realiza el logout si no funciona o esta también vencido
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    if (error.response){
      const apiError: ApiError = {
        name: "error de api",
        message: error.response.error,
        statusCode: error.response.statusCode
      }
      return Promise.reject(apiError);
    }
    return Promise.reject({"error": "Error de conexión hacia el servidor"})
  }
);

export default api;
