import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetail from "./MovieDetail"; // Si MovieDetail es un componente separado

const API_KEY = "a42f4b8a8579e6e49de2b613b6d7adad";
const BASE_URL = "https://api.themoviedb.org/3";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);  // Para almacenar el trailer
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Obtener detalles de la película
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        });
        setMovie(response.data);

        // Obtener los videos (trailers) relacionados con la película
        const videoResponse = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        });
        const trailerData = videoResponse.data.results.find((video) => video.type === "Trailer");
        setTrailer(trailerData ? trailerData.key : null);  // Guardamos el trailer si está disponible

        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar los detalles de la película.");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Mostrar los detalles de la película y el trailer */}
      <MovieDetail movie={movie} trailer={trailer} />
    </div>
  );
};

export default MoviePage;
