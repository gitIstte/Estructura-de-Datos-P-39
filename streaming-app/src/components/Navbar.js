import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-container">
        <Link to="/">Home</Link>
        <Link to="/movies">Películas</Link>
        
        {user ? (
          <div className="user-info">
            <span>Bienvenido, {user.name}</span>
            <button onClick={logout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
