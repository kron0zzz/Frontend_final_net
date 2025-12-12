import { useState } from "react";
import "../styles/register.css";
import axios from "axios";

const API_URL = "/api/Auth";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/register`, { UserName: username, Password:password, Role:"user"});
      setSuccess(res.data.message || "Usuario registrado correctamente");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "No se pudo registrar");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear Usuario</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Registrarse</button>

        <button
          id="login"
          type="button"
          className="btn-back"
          onClick={() => (window.location.href = "/")}
        >
          Volver al inicio de sesión
        </button>
      </form>
    </div>
  );
}

export default Register;
