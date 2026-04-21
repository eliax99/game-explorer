import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchGames = async (search = "") => {
    setLoading(true);

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

      console.log("API RESPONSE:", data); // 👈 IMPORTANTE

      // 🔥 PROTECCIÓN TOTAL
      if (!data) {
        setGames([]);
        return;
      }

      setGames(Array.isArray(data.results) ? data.results : []);

    } catch (error) {
      console.error("FETCH ERROR:", error);
      setGames([]);
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