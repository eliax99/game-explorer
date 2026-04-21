import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      const res = await fetch(`https://api.gamebrain.co/v1/games/${id}`, {
        headers: { "x-api-key": API_KEY }
      });

      const data = await res.json();
      setGame(data);
    };

    fetchGame();
  }, [id]);

  if (!game) return <p className="center">Cargando...</p>;

  return (
    <div className="page">

      <div
        className="hero"
        style={{ backgroundImage: `url(${game.image})` }}
      >
        <div className="heroOverlay">
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <h1>{game.name}</h1>
        </div>
      </div>

      <div className="container">
        <p>{game.description}</p>

        {game.gameplay && (
          <>
            <h2>Gameplay</h2>
            <iframe
              src={game.gameplay}
              title="Gameplay"
              className="video"
              allowFullScreen
            />
          </>
        )}

        {game.screenshots && (
          <>
            <h2>Imágenes</h2>
            <div className="grid">
              {game.screenshots.slice(0, 6).map((img, i) => (
                <img key={i} src={img} alt="" />
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default GameDetailPage;