import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";

function HomePage() {
  const { games, loading, fetchGames } = useContext(GameContext);
  const [search, setSearch] = useState("");

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
        />

        <button onClick={() => fetchGames(search)}>
          Buscar
        </button>
      </div>

      {/* ⏳ LOADING */}
      {loading && <p className="center">Cargando juegos...</p>}

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