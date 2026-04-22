import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function GameDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      setLoading(true);

      try {
        const res = await fetch(`https://api.gamebrain.co/v1/games/${id}`, {
          headers: { "x-api-key": API_KEY }
        });

        const data = await res.json();

        // ⏳ esperamos mínimo 200ms
        setTimeout(() => {
          setGame(data);
          setLoading(false);
        }, 200);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="page">

      <div className="hero">
        {game.gameplay ? (
          <iframe
            src={game.gameplay}
            title="Gameplay"
            className="heroVideo"
            allowFullScreen
          />
        ) : (
          <div
            className="heroFallback"
            style={{ backgroundImage: `url(${game.image})` }}
          />
        )}
        <div className="heroOverlay">
          <button className="backButton" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <h1>{game.name}</h1>
        </div>
      </div>

      <div className="container">
        <p>{game.description}</p>

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