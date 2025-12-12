// src/features/modules/ClienteForm.jsx
import React, { useState } from 'react';
import './styles/modules.css';
import axios from 'axios';
import { useAuth } from '../autenticacion/useAuth';

const API_URL = "/api/Cliente";

function ClienteForm({ cliente, onSave, onCancel }) {
  const { token } = useAuth();
  const [formData, setFormData] = useState(cliente);

  const isCreating = cliente.id === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreating) {
        // Crear cliente
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Actualizar cliente
        await axios.put(`${API_URL}/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSave(); // vuelve a la lista y recarga clientes
    } catch (err) {
      console.error("Error guardando cliente:", err);
      alert("Ocurrió un error al guardar el cliente.");
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">
          {isCreating ? 'Crear Nuevo Cliente' : `Editar Cliente: ${formData.nombre}`}
        </h2>

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input 
              type="text" 
              id="telefono" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              className="form-input"
            />
          </div>

      

          <div className="form-actions">
            <button type="submit" className="action-button save">
              {isCreating ? 'Crear Cliente' : 'Guardar Cambios'}
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

export default ClienteForm;
