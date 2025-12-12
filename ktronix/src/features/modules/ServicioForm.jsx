// src/features/modules/ServicioForm.jsx
import React, { useState } from 'react';
import './styles/modules.css';
import axios from 'axios';
import { useAuth } from '../autenticacion/useAuth.jsx';

const API_URL = "/api/Servicio";

function ServicioForm({ servicio, onSave, onCancel }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState(servicio);

  const isCreating = servicio.id === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreating) {
        // Crear servicio
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Actualizar servicio
        await axios.put(`${API_URL}/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSave(); // vuelve a la lista y recarga servicios
    } catch (err) {
      console.error("Error guardando servicio:", err);
      alert("Ocurrió un error al guardar el servicio.");
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">
          {isCreating ? 'Crear Nuevo Servicio' : `Editar Servicio: ${formData.descripcion_servicio}`}
        </h2>

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-group">
            <label htmlFor="Descripcion_servicio">Descripción del Servicio:</label>
            <input 
              type="text" 
              id="Descripcion_servicio" 
              name="descripcion_servicio" 
              value={formData.descripcion_servicio} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="action-button save">
              {isCreating ? 'Crear Servicio' : 'Guardar Cambios'}
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

export default ServicioForm;
