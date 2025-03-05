import React, { useState, useEffect, useContext } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"; // Importamos el contexto de autenticación
import "./Home.css";

const API_KEY = "a42f4b8a8579e6e49de2b613b6d7adad"; // Tu clave de API
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const { user } = useContext(AuthContext); // Obtenemos el estado del usuario desde el contexto
  const [movies, setMovies] = useState([]); // Estado para las películas populares
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de búsqueda
  const [query, setQuery] = useState(""); // Estado para manejar el valor de la búsqueda
  const navigate = useNavigate(); // Hook de navegación

  // Redirigir al login si el usuario no está logueado
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Obtener las películas populares al cargar la página
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
          params: { api_key: API_KEY }
        });
        setMovies(response.data.results); // Guardar las películas populares
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // Llamar a la función de búsqueda de películas populares
  }, []); // Esto solo se ejecuta una vez cuando el componente se monta

  // Función para realizar la búsqueda
  const onSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query }
      });
      setSearchResults(response.data.results); // Actualiza los resultados de la búsqueda
    } catch (error) {
      console.error("Error al realizar la búsqueda", error);
    }
  };

  // Función para redirigir a la página de películas online
  const handleOnlineMoviesClick = () => {
    navigate('/online-movies'); // Redirigir a la página de películas online
  };

  return (
    <div className="home">
        {/* Nombre de la aplicación CineVerse */}
        <h1 className="page-title">CineVerse</h1>

        {/* Barra de búsqueda y botones */}
        <div className="search-container">
          <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />

        </div>

        {/* Mostrar resultados de búsqueda o películas populares */}
        <div className="movie-results">
          {searchResults.length > 0 ? (
            searchResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p>No se encontraron resultados.</p>
            )
          )}
        </div>

        {/* Footer con datos personales */}
        <footer className="footer">
          <p>Desarrollado por Diego Altamirano</p>
          <p>Correo: distronick.sa@gmail.com</p>
          <p>2025</p>
        </footer>
    </div>
  );
};

export default Home;
