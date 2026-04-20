import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

function HomePage() {
  const { games, loading, fetchGames } = useContext(GameContext);
  const [search, setSearch] = useState("");

  // En HomePage.jsx
return (
  <div style={{ padding: '20px', fontFamily: 'Arial' }}>
    <h2 style={{ textAlign: 'center' }}>Game Explorer 🎮</h2>

    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Buscar juego (ej: Zelda, Mario...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '10px', width: '250px', borderRadius: '5px 0 0 5px', border: '1px solid #ccc' }}
      />
      <button 
        onClick={() => fetchGames(search)}
        style={{ padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
      >
        Buscar
      </button>
    </div>

    {loading && <p style={{ textAlign: 'center' }}>Cargando juegos...</p>}

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: '20px' 
    }}>
      {games.map((game) => (
        <div key={game.id} style={{ 
          border: '1px solid #ddd', 
          borderRadius: '10px', 
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <img 
            src={game.image} 
            alt={game.name} 
            style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{game.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>📅 Año: {game.year}</p>
            <span style={{ 
              display: 'inline-block', 
              backgroundColor: '#eee', 
              padding: '4px 8px', 
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>
              {game.genre}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default HomePage;