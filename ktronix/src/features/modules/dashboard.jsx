// src/features/modules/dashboard.jsx
// (Ajustar la ruta si el archivo está en 'src/features/autenticacion/components')

import React from 'react';
// 1. IMPORTAR LINK DE REACT ROUTER DOM
import { Link } from 'react-router-dom';

// Corregir la ruta de importación del CSS si el archivo dashboard.jsx se movió a 'modules'
// Si el archivo está en 'autenticacion/components' como lo muestras, esta ruta funciona:
import './styles/dashboard.css' 


// Array de datos para los módulos, AÑADIMOS EL PATH
const modulos = [
  // EL path DEBE COINCIDIR con la ruta definida en tu archivo App.jsx
  { id: 1, nombre: 'Clientes', descripcion: 'Gestión y listado de clientes registrados.', path: '/clientes' },
  { id: 2, nombre: 'Servicios', descripcion: 'Configuración y listado de los servicios ofrecidos.', path: '/servicios' },
  { id: 3, nombre: 'Reservas', descripcion: 'Visualización y administración de las reservas.', path: '/reservas' },
];

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Panel de Administración MAKAND</h1>
      <p className="dashboard-welcome">Bienvenido. Aquí puedes acceder a los módulos principales de tu aplicación.</p>

      <div className="modules-grid">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="module-card">
            <h2 className="card-title">{modulo.nombre}</h2>
            <p>{modulo.descripcion}</p>
            
            <Link to={modulo.path} className="card-link">
              <button className="card-button">
                Ir a {modulo.nombre}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;