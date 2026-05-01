import api from "./api";

// GET ALL
export const getProteinas = () => api.get("/proteinas");

// GET ONE
export const getProteina = (id) => api.get(`/proteinas/${id}`);

// CREATE
export const createProteina = (data) => api.post("/proteinas", data);


// UPDATE
export const updateProteina = (id, data) =>
  api.put(`/proteinas/${id}`, data);

// DELETE
export const deleteProteina = (id) =>
  api.delete(`/proteinas/${id}`);