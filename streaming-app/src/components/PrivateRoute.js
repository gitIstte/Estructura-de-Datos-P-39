// src/components/PrivateRoute.js

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta si es necesario

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto

  // Si no hay usuario (no está autenticado), redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, muestra los hijos (la ruta protegida)
  return children;
};

export default PrivateRoute;
