import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/games/${game.id}`} className="card">
      <img src={game.image} alt={game.name} />

      <div className="cardInfo">
        <h3>{game.name}</h3>
        <p>{game.year}</p>
        <span>{game.genre}</span>
      </div>
    </Link>
  );
}

export default GameCard;