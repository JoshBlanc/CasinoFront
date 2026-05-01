import React, { useEffect, useState } from "react";
import ProteinaList from "./ProteinaList";
import ProteinaModal from "./ProteinaModal";

import {
  getProteinas,
  createProteina,
  updateProteina,
  deleteProteina,
} from "../../services/proteinasService";

import {
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from "@coreui/react";

const ProteinasPage = () => {
  const [proteinas, setProteinas] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });

  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    setToasts([
      ...toasts,
      { id: Date.now(), message, type },
    ]);
  };

  const loadProteinas = async () => {
    const res = await getProteinas();
    setProteinas(res.data || []);
  };

  useEffect(() => {
    loadProteinas();
  }, []);

  // 🔹 CREATE
  const handleCreate = () => {
    setMode("create");
    setForm({ nombre: "", descripcion: "" });
    setShowModal(true);
  };

  // 🔹 EDIT
  const handleEdit = (p) => {
    setMode("edit");
    setSelected(p);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
    });
    setShowModal(true);
  };

  // 🔹 SAVE
  const handleSave = async () => {
    try {
      if (mode === "create") {
        await createProteina(form);
        showToast("Creado correctamente", "success");
      } else {
        await updateProteina(selected.id, form);
        showToast("Actualizado correctamente", "info");
      }

      setShowModal(false);
      loadProteinas();
    } catch {
      showToast("Error", "danger");
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar proteína?")) return;

    try {
      await deleteProteina(id);
      showToast("Eliminado", "danger");
      loadProteinas();
    } catch {
      showToast("Error al eliminar", "danger");
    }
  };

  return (
    <div className="p-3">

      <ProteinaList
        proteinas={proteinas}
        onAdd={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProteinaModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        mode={mode}
      />

      {/* TOAST */}
      <CToaster placement="top-end">
        {toasts.map((t) => (
          <CToast
            key={t.id}
            visible
            autohide
            delay={3000}
            color={t.type}
          >
            <CToastHeader closeButton>Notificación</CToastHeader>
            <CToastBody>{t.message}</CToastBody>
          </CToast>
        ))}
      </CToaster>

    </div>
  );
};

export default ProteinasPage;