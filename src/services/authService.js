

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const authService = {
  async login(username, password) {
  const { data } = await axios.post(`${API_URL}/auth/login`, {
    username,
    password,
  })

  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('refresh_token', data.refresh_token)

  return data
},

  async refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token')

    const { data } = await axios.post(`${API_URL}/auth/refresh`, {
      refresh_token
    })

    localStorage.setItem('access_token', data.access_token)

    return data.access_token
  },

  async logout() {
    const refresh_token = localStorage.getItem('refresh_token')

    try {
      await axios.post(`${API_URL}/auth/logout`, {
        refresh_token
      })
    } catch (err) {
      console.log(err)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  getToken() {
    return localStorage.getItem('access_token')
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token')
  }
}

