import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

const ProteinaList = ({ proteinas = [], onAdd, onSelect }) => {
  return (
    <CCard className="shadow-sm border-0 rounded-4">

      {/* HEADER */}
      <CCardHeader className="d-flex justify-content-between align-items-center bg-white border-0">
        <div>
          <h5 className="mb-0 fw-semibold">Proteínas</h5>
          <small className="text-medium-emphasis">
            Gestión de proteínas registradas
          </small>
        </div>

        <CButton color="success" className="text-white px-3" onClick={onAdd}>
          <CIcon icon={cilPlus} className="me-2" />
          Agregar proteína
        </CButton>
      </CCardHeader>

      {/* BODY */}
      <CCardBody className="p-0">

        <CTable hover responsive className="mb-0 align-middle">

          <CTableHead className="table-light">
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Descripción</CTableHeaderCell>
              <CTableHeaderCell className="text-center">
                Estado
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {proteinas.length > 0 ? (
              proteinas.map((p) => (
                <CTableRow key={p.id}>

                  <CTableDataCell>{p.id}</CTableDataCell>

                  {/* 🔥 CLICK EN NOMBRE */}
                  <CTableDataCell
                    className="fw-semibold text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect(p)}
                  >
                    {p.nombre}
                  </CTableDataCell>

                  <CTableDataCell>{p.descripcion}</CTableDataCell>
                 

                  <CTableDataCell className="text-center">
                    <CBadge color="success">Activo</CBadge>
                  </CTableDataCell>

                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center py-4">
                  No hay proteínas registradas
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>

        </CTable>

      </CCardBody>
    </CCard>
  );
};

export default ProteinaList;