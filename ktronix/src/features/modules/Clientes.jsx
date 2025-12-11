// src/features/modules/Clientes.jsx
import React, { useState } from 'react';

import './styles/modules.css'
import ClienteForm from './ClienteForm.jsx'; 


// Datos de ejemplo con campo de dirección completo
const initialClientes = [
    { id: 1, nombre: "Ana García", email: "ana@lunallena.com", telefono: "3001234567", direccion: "Calle 10 # 5-80" },
    { id: 2, nombre: "Luis Pérez", email: "luis@lunallena.com", telefono: "3109876543", direccion: "Avenida Sur # 22-15" },
    { id: 3, nombre: "Marta López", email: "marta@lunallena.com", telefono: "3205554433", direccion: "Carrera 70 # 1-90" },
];

function Clientes() {
  // 2. Estados CLAVE: la lista de clientes y el cliente actualmente editado.
  const [clientes, setClientes] = useState(initialClientes);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  
  // Lógica para ABRIR el formulario de edición/creación
  const handleEdit = (cliente) => {
    // Si pasamos un cliente (al hacer click en 'Ver'), lo editamos. 
    // Si pasamos un objeto vacío/null (al hacer click en '+ Nuevo'), creamos.
    setClienteSeleccionado(cliente);
  };

  // Lógica para VOLVER a la tabla (usada en onSave y onCancel del formulario)
  const handleVolver = () => {
    setClienteSeleccionado(null);
  };
  
  // Lógica de eliminación (funcional)
  const handleDelete = (id) => {
      if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
          setClientes(clientes.filter(c => c.id !== id));
      }
  };

  // 3. RENDERIZADO CONDICIONAL: Si hay un cliente seleccionado, MUESTRA EL FORMULARIO
  if (clienteSeleccionado) {
      return (
          <ClienteForm 
              cliente={clienteSeleccionado} 
              onSave={handleVolver} // Al 'guardar' simuladamente, volvemos a la lista
              onCancel={handleVolver} 
          />
      );
  }


  // 4. VISTA POR DEFECTO: TABLA DE LECTURA (READ)
  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Clientes Registrados</h2>
        
        {/* Botón para crear nuevo cliente (llama a handleEdit con un objeto vacío para iniciar la creación) */}
        <button 
          onClick={() => handleEdit({ id: null, nombre: '', email: '', telefono: '', direccion: '' })} 
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
                  {/* Botón VER/EDITAR: llama a handleEdit con el cliente específico */}
                  <button onClick={() => handleEdit(cliente)} className="action-button view">
                    Ver / Editar
                  </button>
                  <button onClick={() => handleDelete(cliente.id)} className="action-button delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;