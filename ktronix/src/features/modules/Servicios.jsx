// src/features/modules/Servicios.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/modules.css";
import ServicioForm from "./ServicioForm.jsx";
import { useAuth } from "../autenticacion/useAuth.jsx";

const API_URL = "/api/Servicio";

function Servicios() {
  const { token } = useAuth();

  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  // Función reutilizable para cargar servicios
  const fetchServicios = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServicios(res.data);
    } catch (err) {
      console.error("Error al obtener servicios:", err);
    }
  };

  // Cargar servicios al montar el componente
  useEffect(() => {
    const cargar = async () => {
      await fetchServicios();
    };
    cargar();
  }, []);

  // Abrir formulario para crear o editar
  const handleEdit = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  // Volver a la lista
  const handleVolver = () => {
    setServicioSeleccionado(null);
    fetchServicios(); // recargar después de guardar
  };

  // Eliminar servicio
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este servicio?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServicios();
    } catch (err) {
      console.error("Error eliminando servicio:", err);
    }
  };

  // Si se está editando o creando, mostrar el formulario
  if (servicioSeleccionado) {
    return (
      <ServicioForm
        servicio={servicioSeleccionado}
        onSave={handleVolver}
        onCancel={handleVolver}
      />
    );
  }

  // Vista principal: tabla de servicios
  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Servicios Registrados</h2>

        <button
          onClick={() =>
            handleEdit({
              id: null,
              descripcion_servicio: "",
            })
          }
          className="add-button"
        >
          + Nuevo Servicio
        </button>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción del Servicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.id}</td>
                <td>{servicio.descripcion_servicio}</td>
                <td>
                  <button
                    onClick={() => handleEdit(servicio)}
                    className="action-button view"
                  >
                    Ver / Editar
                  </button>

                  <button
                    onClick={() => handleDelete(servicio.id)}
                    className="action-button delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {servicios.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                  No hay servicios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Servicios;
