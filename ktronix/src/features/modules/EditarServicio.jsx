import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/modules.css";

const API_URL = "http://localhost:7141/api/Servicios";

function EditarServicio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargarServicio = async () => {
      try {
        const token = localStorage.getItem("token");
        const r = await axios.get(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNombre(r.data.nombre);
        setDescripcion(r.data.descripcion);
        setPrecio(r.data.precio);
      } catch (err) {
        console.error("Error cargando servicio:", err);
        setError("No se pudo cargar el servicio.");
      }
    };
    cargarServicio();
  }, [id]);

  const editarServicio = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/${id}`,
        { nombre, descripcion, precio: parseFloat(precio) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setTimeout(() => navigate("/servicios"), 700);
    } catch (err) {
      console.error("Error editando servicio:", err);
      setError("Error al editar el servicio.");
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Editar Servicio</h2>
        <form onSubmit={editarServicio} className="crud-form">
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

          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>Guardado correctamente</div>}

          <div className="form-actions">
            <button type="submit" className="action-button save">Guardar Cambios</button>
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

export default EditarServicio;
