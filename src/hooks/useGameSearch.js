import { useState } from "react";

function useGameSearch(fetchGames) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    fetchGames(search);
  };

  return {
    search,
    setSearch,
    handleSearch
  };
}

export default useGameSearch;