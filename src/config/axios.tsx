import axios, {AxiosError} from 'axios';

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

//Actualizar tokens de acceso
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void; }> = [];

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
        const data = {
          "refresh": "refresh"
        };
        const response = await api.post("/token/refresh", data);
        const { accessToken } = response.data.access;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  }
);

export default api;