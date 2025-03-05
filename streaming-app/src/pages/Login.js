import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"; // Asegúrate de que el CSS esté correctamente importado

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la respuesta es correcta, login el usuario
        login(data);
        alert("Inicio de sesión exitoso.");
        navigate("/"); // Redirige al inicio
      } else {
        alert(data.message || "Error en el inicio de sesión.");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Hubo un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">CineVerse</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
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
        <button type="submit">Iniciar Sesión</button>
      </form>

      <div className="register-link">
        <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default Login;
