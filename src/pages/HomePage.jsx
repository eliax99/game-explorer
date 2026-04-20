import { useContext } from "react";
import { GameContext } from "../context/GameContext";

function HomePage() {
  const { games, loading } = useContext(GameContext);

  return (
    <div>
      <h2>Game Explorer 🎮</h2>

      {loading && <p>Cargando...</p>}

      {games.map((game) => (
        <p key={game.id}>{game.name}</p>
      ))}
    </div>
  );
}

export default HomePage;