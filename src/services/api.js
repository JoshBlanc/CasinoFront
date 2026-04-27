import axios from "axios";
import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    // ❗ Rutas donde NO se debe enviar token
    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/verify-otp") ||
      config.url?.includes("/auth/refresh");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si no hay respuesta (error de red)
    if (!error.response) {
      return Promise.reject(error);
    }

    // ==========================
    // MANEJO DE 401 (NO AUTORIZADO)
    // ==========================
    if (error.response.status === 401) {
      // ❗ Evitar bucle infinito
      if (originalRequest._retry) {
        authService.logout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // ⚠️ Solo si tienes refresh token implementado
        const newToken = await authService.refreshToken();

        // Guardar nuevo token
        authService.setToken(newToken);

        // Reintentar petición original
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Si falla refresh → logout
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;