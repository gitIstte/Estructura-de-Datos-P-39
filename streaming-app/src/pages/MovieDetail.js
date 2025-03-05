import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieDetail.css";

// El componente ahora solo depende de las props movie y trailer
const MovieDetail = ({ movie, trailer }) => {
  const navigate = useNavigate(); // Hook para navegar programáticamente

  if (!movie) return <p>No se pudieron cargar los detalles de la película.</p>;

  return (
    <div className="movie-detail">
      <div className="movie-detail-container">
        <div className="movie-poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/path/to/default-image.jpg"
            }
            alt={movie.title}
            className="poster-image"
          />
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>
          <div className="movie-details">
            <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
            <p><strong>Valoración:</strong> {movie.vote_average}</p>
            <p><strong>Lenguaje:</strong> {movie.original_language.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="movie-trailer">
          <h2>Trailer:</h2>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailer}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}

      {/* Botón para regresar a la página principal */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          Regresar a la página principal
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
