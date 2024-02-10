import { gql } from "@apollo/client";

export const URI_BY_FIELDS = {
  characters: "https://rickandmortyapi.com/graphql",
  pokemons: "https://graphql-pokeapi.graphcdn.app",
  allPlanets: "https://swapi-graphql.netlify.app/.netlify/functions/index",
};

// Used to display the query in the UI.
export const MERGED_QUERY_STRING = `query NameQuery {
  characters {
    results {
      id
      name
    }
  }
  pokemons {
    results {
      id
      name
    }
  }
}
query PlanetQuery {
  allPlanets {
    planets {
      id
      name
    }
  }
}`;

export const MERGED_QUERY = gql(MERGED_QUERY_STRING);
