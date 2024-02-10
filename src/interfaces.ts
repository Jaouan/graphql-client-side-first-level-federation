export type Character = {
  name: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type Planet = {
  name: string;
};

export type MergedResult = {
  characters: {
    results: Character[];
  };
  pokemons: {
    results: Pokemon[];
  };
  allPlanets: {
    planets: Planet[];
  };
};
