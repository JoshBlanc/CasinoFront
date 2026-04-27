import React, { useState, useEffect, useRef } from 'react'
import { authService } from '../../../services/authService'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CRow,
  CAlert,
} from '@coreui/react'

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  const inputsRef = useRef([])
  const navigate = useNavigate()

  const username = localStorage.getItem('username')

  // ==========================
  // TIMER
  // ==========================
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // ==========================
  // LIMPIAR ERROR
  // ==========================
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(t)
    }
  }, [error])

  // ==========================
  // MANEJO INPUT OTP
  // ==========================
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus siguiente
    if (value && index < 5) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus()
      }
    }
  }

  // ==========================
  // PEGAR OTP
  // ==========================
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pasteData)) return

    const newOtp = pasteData.split('')
    setOtp([...newOtp, '', '', '', '', ''].slice(0, 6))

    inputsRef.current[5].focus()
  }

  // ==========================
  // VERIFICAR OTP
  // ==========================
const handleVerify = async (e) => {
  e.preventDefault()

  const code = otp.join('')

  if (code.length !== 6) {
    setError('Ingresa los 6 dígitos')
    return
  }

  setLoading(true)

  try {
    const temp_token = localStorage.getItem('temp_token')

    console.log({
      otp: code,
      temp_token
    })

    const res = await authService.verifyOtp(code, temp_token)

    if (res.access_token) {
      localStorage.removeItem('username')
      localStorage.removeItem('temp_token') // 🔥 limpia esto también
      navigate('/dashboard')
    }
  } catch (err) {
    console.error(err.response?.data || err)
    setError('Código incorrecto o expirado')
  } finally {
    setLoading(false)
  }
}

  // ==========================
  // REENVIAR OTP
  // ==========================
  const handleResend = async () => {
    try {
      await authService.login(username, '') // solo reenvía OTP
      setTimeLeft(60)
    } catch (err) {
      setError('Error reenviando código')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4 text-center">
              <CCardBody>

                <h2>Verificación</h2>
                <p className="text-body-secondary">
                  Ingresa el código de 6 dígitos enviado a tu correo
                </p>

                {error && (
                  <CAlert color="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </CAlert>
                )}

                <CForm onSubmit={handleVerify}>
                  {/* INPUTS OTP */}
                  <div className="d-flex justify-content-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        style={{
                          width: '45px',
                          height: '55px',
                          textAlign: 'center',
                          fontSize: '20px',
                          borderRadius: '8px',
                          border: '1px solid #ced4da',
                        }}
                      />
                    ))}
                  </div>

                  <CButton
                    type="submit"
                    color="primary"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Verificando...' : 'Verificar'}
                  </CButton>
                </CForm>

                {/* TIMER / REENVIAR */}
                <div>
                  {timeLeft > 0 ? (
                    <small className="text-muted">
                      Reenviar código en {timeLeft}s
                    </small>
                  ) : (
                    <CButton color="link" onClick={handleResend}>
                      Reenviar código
                    </CButton>
                  )}
                </div>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default VerifyOtp