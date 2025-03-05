import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Importamos los estilos de la página de registro

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Cambié password_hash a password
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }), // Enviar el password como está
    });

    if (response.ok) {
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } else {
      alert("Error al registrarse.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">CineVerse</h2>

      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
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
          value={password} // Cambié password_hash a password
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Registrarse</button>
      </form>

      <div className="login-link">
        <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;
