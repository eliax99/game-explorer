import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Loader from "../components/Loader";
import GameCard from "../components/GameCard";
import HomePage from "../pages/HomePage";
import { GameContext } from "../context/GameContext";


// ✅ TEST 1 — Loader
test("muestra texto cargando", () => {
  render(<Loader />);
  expect(screen.getByText("Cargando...")).toBeInTheDocument();
});


// ✅ TEST 2 — GameCard muestra nombre
test("muestra el nombre del juego", () => {
  const game = {
    id: 1,
    name: "Zelda",
    image: "test.jpg",
    genre: "Adventure"
  };

  render(
    <MemoryRouter>
      <GameCard game={game} />
    </MemoryRouter>
  );

  expect(screen.getByText("Zelda")).toBeInTheDocument();
});


// ✅ TEST 3 — HomePage tiene barra de búsqueda
test("muestra el input de búsqueda", () => {
  const value = {
    games: [],
    loading: false,
    fetchGames: () => {}
  };

  render(
    <MemoryRouter>
      <GameContext.Provider value={value}>
        <HomePage />
      </GameContext.Provider>
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText("Buscar juego...")).toBeInTheDocument();
});