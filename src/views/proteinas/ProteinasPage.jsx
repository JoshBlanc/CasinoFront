import React, { useEffect, useState } from 'react'
import ProteinaList from './ProteinaList'
import { getProteinas, createProteina } from '../../services/proteinasService'
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'

const ProteinasPage = () => {
  const [toasts, setToasts] = useState([])

  const [toastMsg, setToastMsg] = useState('')

  const [proteinas, setProteinas] = useState([])

  const [showCreate, setShowCreate] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
  })

  const showToast = (message) => {
    setToasts([
      ...toasts,
      {
        id: Date.now(),
        message,
      },
    ])
  }

  // 🔥 CARGAR LISTA
  const loadProteinas = async () => {
    try {
      const res = await getProteinas()
      setProteinas(res.data || [])
    } catch (error) {
      console.error('Error GET:', error)
    }
  }

  useEffect(() => {
    loadProteinas()
  }, [])

  // INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // 🔥 POST REAL
  const handleSave = async () => {
    try {
      await createProteina(form)

      // cerrar modal
      setShowCreate(false)

      // limpiar form
      setForm({ nombre: '', descripcion: '' })

      // recargar tabla
      loadProteinas()
      //Mensaje de creacion
      showToast('Proteína creada correctamente')
    } catch (error) {
      console.error('Error POST:', error)
    }
  }

  return (
    <div className="p-3">
      <ProteinaList proteinas={proteinas} onAdd={() => setShowCreate(true)} />

      {/* MODAL CREAR */}
      {showCreate && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Crear proteína</h5>
                <button className="btn-close" onClick={() => setShowCreate(false)} />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label>Nombre</label>
                  <input
                    className="form-control"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Descripción</label>
                  <textarea
                    className="form-control"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>
                  Cancelar
                </button>

                <button className="btn btn-success" onClick={handleSave}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CToaster placement="top-end">
        {toasts.map((toast) => (
          <CToast
            key={toast.id}
            autohide
            delay={3000}
            visible
            onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
          >
            <CToastHeader closeButton>Notificación</CToastHeader>

            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        ))}
      </CToaster>
    </div>
  )
}

export default ProteinasPage
