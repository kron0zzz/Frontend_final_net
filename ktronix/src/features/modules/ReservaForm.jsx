// src/features/modules/ReservaForm.jsx
import React, { useState } from 'react';
import './styles/modules.css';
import axios from 'axios';
import { useAuth } from '../autenticacion/useAuth';

const API_URL = "/api/Reserva";

function ReservaForm({ reserva, clientes, servicios, estados, onSave, onCancel }) {
  const { token } = useAuth();

  const isCreating = reserva.id === null;

  // Inicializamos formData, agregando fecha actual si es creación y no hay fecha
  const [formData, setFormData] = useState({
    ...reserva,
    fechaReserva: reserva.fechaReserva || (new Date().toISOString().slice(0,16))
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreating) {
        // Crear reserva
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Actualizar reserva
        await axios.put(`${API_URL}/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSave(); // vuelve a la lista y recarga reservas
    } catch (err) {
      console.error("Error guardando reserva:", err);
      alert("Ocurrió un error al guardar la reserva.");
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">
          {isCreating ? 'Crear Nueva Reserva' : `Editar Reserva ID: ${formData.id}`}
        </h2>

        <form onSubmit={handleSubmit} className="crud-form">
          {/* Select Cliente */}
          <div className="form-group">
            <label htmlFor="clienteId">Cliente:</label>
            <select
              id="clienteId"
              name="idCliente"
              value={formData.idCliente || ""}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">-- Seleccione un cliente --</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Select Servicio */}
          <div className="form-group">
            <label htmlFor="servicioId">Servicio:</label>
            <select
              id="servicioId"
              name="idServicio"
              value={formData.idServicio || ""}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">-- Seleccione un servicio --</option>
              {servicios.map(s => (
                <option key={s.id} value={s.id}>{s.descripcion_servicio}</option>
              ))}
            </select>
          </div>

          {/* Select Estado Reserva */}
          <div className="form-group">
            <label htmlFor="estadoReservaId">Estado:</label>
            <select
              id="estadoReservaId"
              name="estado"
              value={formData.estado || ""}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">-- Seleccione un estado --</option>
              {estados.map(e => (
                <option key={e.id} value={e.id}>{e.descripcion}</option>
              ))}
            </select>
          </div>

          {/* Fecha de la reserva */}
          <div className="form-group">
            <label htmlFor="fecha">Fecha:</label>
            <input
              readOnly
              type="text"
              id="fecha"
              name="fechaReserva"
              value={formData.fechaReserva || ""}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="action-button save">
              {isCreating ? 'Crear Reserva' : 'Guardar Cambios'}
            </button>
            <button type="button" onClick={onCancel} className="action-button cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservaForm;
