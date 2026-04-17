import axios from 'axios'
import { authService } from './authService'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const newToken = await authService.refreshToken()

        err.config.headers.Authorization = `Bearer ${newToken}`
        return api(err.config)
      } catch (e) {
        authService.logout()
        window.location.href = '/login'
      }
    }

    return Promise.reject(err)
  }
)

export default api