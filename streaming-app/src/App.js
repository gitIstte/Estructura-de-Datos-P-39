import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Login from "./pages/Login"; // Asegúrate de importar el componente Login
import Register from "./pages/Register"; // Asegúrate de importar el componente Register
import PrivateRoute from "./components/PrivateRoute"; // Asegúrate de importar el componente PrivateRoute
import ProtectedPage from "./pages/ProtectedPage"; // Asegúrate de importar el componente ProtectedPage
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
