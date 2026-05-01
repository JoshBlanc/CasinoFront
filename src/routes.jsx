import React from 'react'

// Públicas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const VerifyOtp = React.lazy(() => import('./views/pages/auth/VerifyOtp'))

// Privadas
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ProteinasProtected = React.lazy(() => import('./views/proteinas/ProteinasProtected'))

export const routes = [
  { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/login', name: 'Login', element: Login },
  { path: '/verify-otp', name: 'Verify OTP', element: VerifyOtp },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard/proteinas', name: 'Proteinas', element: ProteinasProtected },
]

export default routes