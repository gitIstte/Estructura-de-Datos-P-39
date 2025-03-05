import React from 'react';
import './SearchBar.css';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e) => {
    setQuery(e.target.value);  // Actualiza el valor de la búsqueda
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();  // Ejecuta la búsqueda cuando presionamos Enter
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}  // Vinculado al estado query
        onChange={handleInputChange}  // Actualiza el valor del query
        onKeyDown={handleKeyDown}  // Ejecuta búsqueda con 'Enter'
      />
      <button onClick={onSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
