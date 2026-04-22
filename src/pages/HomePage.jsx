import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useGameSearch from "../hooks/useGameSearch";

function HomePage() {
  const { games, loading, fetchGames } = useContext(GameContext);

  // 🔥 hook personalizado
  const { search, setSearch, handleSearch } = useGameSearch(fetchGames);

  return (
    <div className="page">
      {/* 🔥 TITULO */}
      <Link to="/" className="titleLink">
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
      <div className="gridHome">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;