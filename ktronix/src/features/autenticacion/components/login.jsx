import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Esta función simula lo que luego será la llamada real a la API
  async function handleLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.trim() !== "" && password.trim() !== "") {
          resolve({
            token: "token_de_prueba_fake_123",
            user: { email }
          });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 600);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await handleLoginRequest(email, password);

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

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

        {error && <p className="error">{error}</p>}

        <button type="submit">Ingresar</button>

        {/* Botón de registro */}
        <button
          id="register"
          type="button"
          onClick={() => (window.location.href = "/register")}
          className="btn-register"
          style={{ marginTop: "10px" }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Login;
