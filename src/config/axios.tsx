import { logout, setAccessToken } from '@/store/userSlice';
import axios, {AxiosError} from 'axios';
import { useDispatch } from 'react-redux';
import { store } from '@/store/store';

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
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
    const accessToken = store.getState().user.accessToken;
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
    const dispatch = useDispatch();
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
        const refreshToken = store.getState().user.refreshToken;
        const response = await api.post("/token/refresh", { refresh: refreshToken});
        const { accessToken } = response.data.access;
        // Actualizar el access token en la consulta
        store.dispatch(setAccessToken(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        // se realiza el logout si no funciona o esta también vencido
        dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  }
);

export default api;