import { Routes, Route } from "react-router-dom";
import "./App.css";

// Autenticación
import Login from "./features/autenticacion/components/login";
import Register from "./features/autenticacion/components/register";

// Módulos
import Dashboard from "./features/modules/dashboard";
import Clientes from "./features/modules/Clientes.jsx";
import Reservas from "./features/modules/Reservas.jsx";
import Servicios from "./features/modules/Servicios.jsx";

// CRUD Servicios (importa estos archivos)
import CrearServicio from "./features/modules/CrearServicio.jsx";
import EditarServicio from "./features/modules/EditarServicio.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CLIENTES */}
        <Route path="/clientes" element={<Clientes />} />

        {/* RESERVAS */}
        <Route path="/reservas" element={<Reservas />} />

        {/* SERVICIOS CRUD */}
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/crear" element={<CrearServicio />} />
        <Route path="/servicios/editar/:id" element={<EditarServicio />} />
      </Routes>
    </>
  );
}

export default App;
