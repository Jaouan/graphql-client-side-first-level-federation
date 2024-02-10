# 🧪 POC - Client-side GraphQL "First-Level Federation"

> [!WARNING]
> This project is a Proof-Of-Concept. It is intended only for evaluation purposes.

A single hook with a unique GraphQL query fetches from multiple GraphQL APIs. Each first-level field has its own source.

[**✨ Live demo**](https://jaouan.github.io/graphql-client-side-first-level-federation/)

## Usage
### Provider
```ts
<DataProvider uriByFirstLevelFields={{
  "characters": "https://rickandmortyapi.com/graphql",
  "pokemons": "https://graphql-pokeapi.graphcdn.app",
  "allPlanets": "https://swapi-graphql.netlify.app/.netlify/functions/index"
}}>
    ...
</DataProvider>
```

### Hooks
With Suspense:
```ts
const { data } = useSuspenseDataQuery(gql`
   query NameQuery {
     characters {
       results { id name }
     }
     pokemons {
       results { id name }
     }
   }
   query PlanetQuery {
     allPlanets {
       planets { id name }
     }
   }
`);
```
  
With basic hook:
```ts
const { loading, data, error } = useDataQuery(gql`query { ... }`);
```
