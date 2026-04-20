import { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const GameContext = createContext();

function GameProvider({ children }) {
  // Estado para guardar los juegos
  const [games, setGames] = useState([]);

  // Estado para saber si está cargando
  const [loading, setLoading] = useState(false);

  const API_KEY = "TU_API_KEY"; 

  // Función para obtener juegos de la API
  const fetchGames = async (search = "") => {
    setLoading(true); // empieza carga

    try {
      const url = search
        ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`
        : `https://api.rawg.io/api/games?key=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      setGames(data.results); // guardamos juegos
    } catch (error) {
      console.error(error);
    }

    setLoading(false); // termina carga
  };

  // Se ejecuta al iniciar la app
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    // Compartimos datos con toda la app
    <GameContext.Provider value={{ games, loading, fetchGames }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;