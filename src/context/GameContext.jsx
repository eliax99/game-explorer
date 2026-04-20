import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "3ebf20939d0142668830a20967c06f5b";

  const fetchGames = async (search = "") => {
    setLoading(true);
    try {
      // Si search no es string (ej. un evento), usamos vacío.
      const queryText = typeof search === "string" ? search.trim() : "";
      
      const url = queryText 
        ? `https://api.gamebrain.co/v1/games?query=${encodeURIComponent(queryText)}`
        : `https://api.gamebrain.co/v1/games`;

      const res = await fetch(url, {
        headers: { "x-api-key": API_KEY }
      });

      const data = await res.json();
      
      // La API devuelve los juegos en .results
      setGames(data.results || []);

    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <GameContext.Provider value={{ games, loading, fetchGames }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;