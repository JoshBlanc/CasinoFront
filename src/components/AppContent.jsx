import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { routes } from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>

          {/* 🔥 RUTAS RELATIVAS AL LAYOUT (/dashboard ya está aplicado) */}
          {routes.map((route, idx) => {
            const Component = route.element

            if (!Component) return null

            // Quitamos "/dashboard/" para evitar duplicación
            const path = route.path.replace('/dashboard/', '')

            return (
              <Route
                key={idx}
                path={path}
                element={<Component />}
              />
            )
          })}

          {/* ruta por defecto dentro del layout */}
          <Route index element={<Navigate to="dashboard" replace />} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)