import axios from "axios";

// URL base de tu API en Azure
const BASE_URL = "https://apifinal2-bsgcdscjcbe0dbht.mexicocentral-01.azurewebsites.net/api/Clientes";

// Helper para armar headers con token
const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Obtener todos los clientes
export const getClientes = async (token) => {
  const res = await axios.get(BASE_URL, authHeaders(token));
  return res.data;
};

// Obtener un cliente por ID
export const getClienteById = async (id, token) => {
  const res = await axios.get(`${BASE_URL}/${id}`, authHeaders(token));
  return res.data;
};

// Crear cliente
export const createCliente = async (cliente, token) => {
  const res = await axios.post(BASE_URL, cliente, authHeaders(token));
  return res.data;
};

// Actualizar cliente
export const updateCliente = async (id, cliente, token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, cliente, authHeaders(token));
  return res.data;
};

// Eliminar cliente
export const deleteCliente = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, authHeaders(token));
  return res.data;
};
