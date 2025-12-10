import { useState } from "react";
import "../styles/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulación de envío de registro (igual que tu login simulado)
  async function fakeRegisterRequest(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.trim() !== "" && password.trim() !== "") {
          resolve({ message: "Usuario registrado correctamente" });
        } else {
          reject(new Error("Datos inválidos"));
        }
      }, 600);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fakeRegisterRequest(email, password);
      setSuccess(res.message);

      // En un backend real, aquí redirigirías después de un registro exitoso
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (err) {
      setError(err.message || "No se pudo registrar");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear Usuario</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
