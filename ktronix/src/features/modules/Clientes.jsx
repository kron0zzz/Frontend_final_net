// src/features/modules/Clientes.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/modules.css";
import ClienteForm from "./ClienteForm.jsx";
import { useAuth } from "../autenticacion/useAuth.jsx";

const API_URL = "/api/Cliente";

function Clientes() {
  const { token } = useAuth();

  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Función reutilizable para cargar clientes
  const fetchClientes = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(res.data);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    const cargar = async () => {
      await fetchClientes();
    };
    cargar();
  }, []);

  // Abrir formulario para crear o editar
  const handleEdit = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  // Volver a la lista
  const handleVolver = () => {
    setClienteSeleccionado(null);
    fetchClientes(); // recargar después de guardar
  };

  // Eliminar cliente
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClientes();
    } catch (err) {
      console.error("Error eliminando cliente:", err);
    }
  };

  // Si se está editando o creando, mostrar el formulario
  if (clienteSeleccionado) {
    return (
      <ClienteForm
        cliente={clienteSeleccionado}
        onSave={handleVolver}
        onCancel={handleVolver}
      />
    );
  }

  // Vista principal: tabla de clientes
  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Clientes Registrados</h2>

        <button
          onClick={() =>
            handleEdit({
              id: null,
              nombre: "",
              email: "",
              telefono: "",

            })
          }
          className="add-button"
        >
          + Nuevo Cliente
        </button>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Correo Electrónico</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>
                  <button
                    onClick={() => handleEdit(cliente)}
                    className="action-button view"
                  >
                    Ver / Editar
                  </button>

                  <button
                    onClick={() => handleDelete(cliente.id)}
                    className="action-button delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {clientes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
