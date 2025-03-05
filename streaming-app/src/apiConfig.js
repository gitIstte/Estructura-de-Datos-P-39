import axios from "axios";

const API_KEY = "a42f4b8a8579e6e49de2b613b6d7adad"; // Reemplázalo con tu clave de TMDB
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: { api_key: API_KEY }
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
