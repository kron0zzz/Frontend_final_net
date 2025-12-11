// src/features/modules/ClienteForm.jsx
import React, { useState } from 'react';
import './styles/modules.css'


function ClienteForm({ cliente, onSave, onCancel }) {
  // Inicializamos el estado del formulario con los datos del cliente que se pasa
  const [formData, setFormData] = useState(cliente);

  const isCreating = cliente.id === null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada a la API (POST para crear, PUT para actualizar)
    console.log("Datos a guardar:", formData);
    
    // Luego de la supuesta llamada a la API, llamamos a onSave para volver a la lista
    onSave(); 
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
          
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input 
              type="text" 
              id="direccion" 
              name="direccion" 
              value={formData.direccion} 
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