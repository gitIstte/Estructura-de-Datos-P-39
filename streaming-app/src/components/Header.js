import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Si quieres agregar estilos adicionales

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Streaming en Línea</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li><li>
            <Link to="/planes">Planes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
