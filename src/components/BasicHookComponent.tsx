import { MERGED_QUERY } from "../config";
import { Character, MergedResult, Pokemon } from "../interfaces";
import { useDataQuery } from "../query";

export const BasicHookComponent = () => {
  const { loading, data, error } = useDataQuery<MergedResult>(MERGED_QUERY);
  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <div className="lists">
      <div>
        <h3>Rick & Morty</h3>
        <ul>
          {data?.characters.results.map(({ name }: Character) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Pokemons</h3>
        <ul>
          {data?.pokemons.results.map(({ name }: Pokemon) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
