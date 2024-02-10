import { describe, it, expect } from "vitest";
import { OperationDefinitionNode, parse, print } from "graphql";
import {
  extractFirstLevelFieldQueries,
  extractQueries,
} from "../src/query/first-level-field-parser";

describe("extractFirstLevelFieldQueries", () => {
  it("should extract firstLevelField queries from an operation definition node", () => {
    const queryAst = parse(`
      query {
        field1
        field2
      }
    `);

    const operationDefinitionNode = queryAst
      .definitions[0] as OperationDefinitionNode;
    const firstLevelFieldQueries = extractFirstLevelFieldQueries(operationDefinitionNode);

    expect(firstLevelFieldQueries.length).toBe(2);
    expect(firstLevelFieldQueries[0].firstLevelField).toBe("field1");
    expect(firstLevelFieldQueries[1].firstLevelField).toBe("field2");
    expect(print(firstLevelFieldQueries[0].query)).toContain("field1");
    expect(print(firstLevelFieldQueries[1].query)).toContain("field2");
  });
});

describe("extractQueries", () => {
  it("should extract queries for different firstLevelFields from a unified GraphQL query", () => {
    const unifiedQuery = parse(`
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
    `);

    const firstLevelFieldQueries = extractQueries(unifiedQuery);

    expect(print(firstLevelFieldQueries[0].query)).toEqual(`query NameQuery {
  characters {
    results {
      id
      name
    }
  }
}`);
    expect(print(firstLevelFieldQueries[1].query)).toEqual(`query NameQuery {
  pokemons {
    results {
      id
      name
    }
  }
}`);

    expect(print(firstLevelFieldQueries[2].query)).toEqual(`query PlanetQuery {
  allPlanets {
    planets {
      id
      name
    }
  }
}`);
  });
});
