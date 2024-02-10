# 🧪 POC - Client-side GraphQL "First-Level Federation"

This project is a Proof-Of-Concept of Client-side GraphQL "First-Level Federation" using :
- Apollo Client
- React

[✨ Live demo](TODO)

### Configuration
Every first-level field have a specific source.
```javascript
{
  characters: "https://rickandmortyapi.com/graphql",
  pokemons: "https://graphql-pokeapi.graphcdn.app",
  allPlanets: "https://swapi-graphql.netlify.app/.netlify/functions/index",
}
```
So this request works.
```gql
query NameQuery {
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
}
```
