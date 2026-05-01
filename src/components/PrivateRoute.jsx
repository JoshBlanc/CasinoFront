import { Navigate } from "react-router-dom"

const isTokenValid = (token) => {
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const exp = payload.exp * 1000 // convertir a ms
    return Date.now() < exp
  } catch (error) {
    return false
  }
}

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token")

  if (!isTokenValid(token)) {
    localStorage.removeItem("access_token")
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute