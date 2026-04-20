import { useParams } from "react-router-dom";

function GameDetailPage() {
  const { id } = useParams();

  return <h2>Detalle del juego ID: {id}</h2>;
}

export default GameDetailPage;