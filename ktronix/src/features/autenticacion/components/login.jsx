import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

import "../styles/login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ UserName: userName, Password: password, Role:"user" }),
        }
      );

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      login(data.token, { UserName: userName, Role: data.role || "user" });

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err.response?.data);
      setError(err.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
