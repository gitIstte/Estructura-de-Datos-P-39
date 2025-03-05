// src/components/ErrorBoundary.js

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que la próxima renderización muestre una interfaz de usuario de respaldo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes enviar el error a un servicio de registro de errores
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de usuario de respaldo
      return (
        <div>
          <h2>Algo salió mal.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
