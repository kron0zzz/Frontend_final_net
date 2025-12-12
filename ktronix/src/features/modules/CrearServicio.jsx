import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/modules.css";

const API_URL = "http://localhost:7141/api/Servicios";

function CrearServicio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const crearServicio = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        API_URL,
        { nombre, descripcion, precio: parseFloat(precio) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/servicios");
    } catch (err) {
      console.error("Error creando servicio:", err);
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Crear Servicio</h2>
        <form onSubmit={crearServicio} className="crud-form">
          <div className="form-group">
            <label>Nombre</label>
            <input
              className="form-input"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input
              className="form-input"
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              className="form-input"
              required
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="action-button save">Guardar</button>
            <button
              type="button"
              className="action-button cancel"
              onClick={() => navigate("/servicios")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearServicio;
