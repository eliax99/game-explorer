import { useContext, useMemo } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useGameSearch from "../hooks/useGameSearch";

function HomePage() {
  const { games, loading, fetchGames } = useContext(GameContext);

  const { search, setSearch, handleSearch } = useGameSearch(fetchGames);

  // 🔥 RESET COMPLETO
  const handleReset = () => {
    setSearch(""); // limpia input
    fetchGames(); // vuelve a traer juegos iniciales
  };

  const renderedGames = useMemo(() => {
    return games
      .slice(0, 9)
      .map((game) => <GameCard key={game.id} game={game} />);
  }, [games]);

  return (
    <div className="page">
      {/* 🔥 TITULO (RESET + HOME) */}
      <Link to="/" className="titleLink" onClick={handleReset}>
        <h1 className="title">Game Explorer 🎮</h1>
      </Link>

      {/* 🔍 SEARCH */}
      <div className="search">
        <input
          type="text"
          placeholder="Buscar juego..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* ⏳ LOADING */}
      {loading && <Loader />}

      {/* 🎮 GRID */}
      <div className="gridHome">{renderedGames}</div>
    </div>
  );
}

export default HomePage;
