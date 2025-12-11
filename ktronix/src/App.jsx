import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from './features/autenticacion/components/login'
import Register from './features/autenticacion/components/register';
import Dashboard from './features/modules/dashboard';
import Clientes from './features/modules/Clientes.jsx';
import Reservas from './features/modules/Reservas.jsx';
import Servicios from './features/modules/Servicios.jsx';
// Importa estos componentes cuando los crees:
// import Servicios from './features/modules/Servicios.jsx';
// import Reservas from './features/modules/Reservas.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/servicios" element={<Servicios />} />

        {/* Descomenta cuando tengas los componentes creados:
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/reservas" element={<Reservas />} />
        */}
      </Routes>
    </>
  )
}

export default App