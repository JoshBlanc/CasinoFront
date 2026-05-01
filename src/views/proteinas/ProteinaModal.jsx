import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";

const ProteinaModal = ({
  visible,
  onClose,
  onSave,
  form,
  setForm,
  mode,
}) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>
          {mode === "create" ? "Crear proteína" : "Editar proteína"}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CFormInput
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="mb-3"
        />

        <CFormTextarea
          label="Descripción"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>

        <CButton color="success" onClick={onSave}>
          Guardar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ProteinaModal;