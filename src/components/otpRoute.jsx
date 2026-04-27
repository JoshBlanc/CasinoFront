import { Navigate } from "react-router-dom"

const OtpRoute = ({ children }) => {
  const tempToken = localStorage.getItem("temp_token")

  // 🔒 Si no hay proceso OTP activo → no entra
  if (!tempToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default OtpRoute