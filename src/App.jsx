import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'

import './scss/style.scss'
import './scss/examples.scss'

// Auth pages
import Login from './views/pages/login/Login'
import VerifyOtp from './views/pages/auth/VerifyOtp'
import OtpRoute from './components/otpRoute'

// Layout
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes(
    'coreui-free-react-admin-template-theme',
  )

  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const theme = urlParams.get('theme')

    if (theme) {
      setColorMode(theme)
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [])

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>

          {/* AUTH */}
          <Route path="/login" element={<Login />} />

          <Route
            path="/verify-otp"
            element={
              <OtpRoute>
                <VerifyOtp />
              </OtpRoute>
            }
          />

          {/* APP PRINCIPAL (TODO LO DEMÁS VA DENTRO DEL LAYOUT) */}
          <Route path="/dashboard/*" element={<DefaultLayout />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App