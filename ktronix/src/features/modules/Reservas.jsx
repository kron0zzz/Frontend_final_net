// src/features/modules/Reservas.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/modules.css";
import ReservaForm from "./ReservaForm.jsx";
import { useAuth } from "../autenticacion/useAuth.jsx";

const API_URL = "/api/Reserva";

function Reservas() {
  const { token } = useAuth();

  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);

  const [filtroCliente, setFiltroCliente] = useState("");

  // Cargar reservas
  const fetchReservas = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservas(res.data);
    } catch (err) {
      console.error("Error al obtener reservas:", err);
    }
  };

  // Cargar datos relacionados: clientes, servicios, estados
  const fetchDatosRelacionados = async () => {
    try {
      const [resClientes, resServicios, resEstados] = await Promise.all([
        axios.get("/api/Cliente", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/Servicio", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("/api/EstadoReserva", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setClientes(resClientes.data);
      setServicios(resServicios.data);
      setEstados(resEstados.data);
    } catch (err) {
      console.error("Error al cargar datos relacionados:", err);
    }
  };

  useEffect(() => {
    const cargarTodo = async () => {
      await fetchDatosRelacionados();
      await fetchReservas();
    };

    cargarTodo();
  }, []);

  // Abrir formulario para crear o editar
  const handleEdit = (reserva) => {
    setReservaSeleccionada(reserva);
  };

  // Volver a la lista
  const handleVolver = () => {
    setReservaSeleccionada(null);
    fetchReservas();
  };

  // Eliminar reserva
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reserva?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservas();
    } catch (err) {
      console.error("Error eliminando reserva:", err);
    }
  };

  // Filtrado por cliente
  const reservasFiltradas = filtroCliente
    ? reservas.filter(r => r.idCliente === parseInt(filtroCliente))
    : reservas;

  // Mostrar formulario si se está creando o editando
  if (reservaSeleccionada) {
    return (
      <ReservaForm
        reserva={reservaSeleccionada}
        onSave={handleVolver}
        onCancel={handleVolver}
        clientes={clientes}
        servicios={servicios}
        estados={estados}
      />
    );
  }

  // Vista principal: tabla de reservas
  return (
    <div className="module-page-container">
      <div className="module-card-content">
        <h2 className="module-title">Reservas Registradas</h2>

        <div className="filter-section">
          <label htmlFor="filtroCliente">Filtrar por Cliente:</label>
          <select
            id="filtroCliente"
            value={filtroCliente}
            onChange={e => setFiltroCliente(e.target.value)}
          >
            <option value="">Todos</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            handleEdit({
              id: null,
              idCliente: "",
              idServicio: "",
              estado: "",
              fechaReserva: "",
            })
          }
          className="add-button"
        >
          + Nueva Reserva
        </button>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{clientes.find(c => c.id === reserva.idCliente)?.nombre || reserva.idCliente}</td>
                <td>{servicios.find(s => s.id === reserva.idServicio)?.descripcion_servicio || reserva.idServicio}</td>
                <td>{estados.find(e => e.id === reserva.estado)?.descripcion || reserva.estado}</td>
                <td>{reserva.fechaReserva}</td>
                <td>
                  <button
                    onClick={() => handleEdit(reserva)}
                    className="action-button view"
                  >
                    Ver / Editar
                  </button>

                  <button
                    onClick={() => handleDelete(reserva.id)}
                    className="action-button delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {reservasFiltradas.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No hay reservas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservas;
