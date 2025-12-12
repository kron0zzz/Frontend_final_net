import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/modules.css";

const API_URL = "http://localhost:7141/api/Servicios";

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem("token");
        const r = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServicios(r.data);
      } catch (err) {
        console.error("Error cargando servicios:", err);
        setError("No se pudieron cargar los servicios.");
      }
    };
    cargar();
  }, []);

  const eliminarServicio = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServicios(servicios.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error eliminando servicio:", err);
    }
  };

  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Servicios</h2>
        <Link to="/servicios/crear" className="add-button">+ Nuevo Servicio</Link>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.nombre}</td>
                <td>{s.descripcion}</td>
                <td>${s.precio}</td>
                <td>
                  <Link to={`/servicios/editar/${s.id}`} className="action-button edit">
                    Editar
                  </Link>
                  <button
                    className="action-button delete"
                    onClick={() => eliminarServicio(s.id)}
                  >
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

export default Servicios;
