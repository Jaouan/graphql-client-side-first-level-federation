import { MERGED_QUERY } from "../config";
import { Character, MergedResult, Planet, Pokemon } from "../interfaces";
import { useSuspenseDataQuery } from "../query";

export const SuspenseComponent = () => {
  const {
    data: { pokemons, characters, allPlanets },
  } = useSuspenseDataQuery<MergedResult>(MERGED_QUERY);

  return (
    <div className="lists">
      <div>
        <h3>Rick & Morty</h3>
        <ul>
          {characters.results.map(({ name }: Character) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Pokemons</h3>
        <ul>
          {pokemons.results.map(({ name }: Pokemon) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Planets</h3>
        <ul>
          {allPlanets.planets.slice(0, 20).map(({ name }: Planet) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
