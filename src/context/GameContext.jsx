import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchGames = async (search = "") => {
    setLoading(true);

    const startTime = Date.now(); // ⏱️ inicio del loading

    try {
      const queryText = typeof search === "string" ? search.trim() : "";

      const url = queryText
        ? `https://api.gamebrain.co/v1/games?query=${encodeURIComponent(queryText)}`
        : `https://api.gamebrain.co/v1/games`;

      const res = await fetch(url, {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      const data = await res.json();

      setGames(data.results || []);

    } catch (error) {
      console.error("FETCH ERROR:", error);
      setGames([]);
    } finally {
      // ⏱️ forzar mínimo 1s de loader
      const elapsed = Date.now() - startTime;
      const minTime = 1000;

      const wait = Math.max(minTime - elapsed, 0);

      setTimeout(() => {
        setLoading(false);
      }, wait);
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