import { describe, it, expect } from "vitest";
import { OperationDefinitionNode, parse, print } from "graphql";
import {
  extractDomainQueries,
  extractQueries,
} from "../src/query/domain-parser";

describe("extractDomainQueries", () => {
  it("should extract domain queries from an operation definition node", () => {
    const queryAst = parse(`
      query {
        field1
        field2
      }
    `);

    const operationDefinitionNode = queryAst
      .definitions[0] as OperationDefinitionNode;
    const domainQueries = extractDomainQueries(operationDefinitionNode);

    expect(domainQueries.length).toBe(2);
    expect(domainQueries[0].domain).toBe("field1");
    expect(domainQueries[1].domain).toBe("field2");
    expect(print(domainQueries[0].query)).toContain("field1");
    expect(print(domainQueries[1].query)).toContain("field2");
  });
});

describe("extractQueries", () => {
  it("should extract queries for different domains from a unified GraphQL query", () => {
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

    const domainQueries = extractQueries(unifiedQuery);

    expect(print(domainQueries[0].query)).toEqual(`query NameQuery {
  characters {
    results {
      id
      name
    }
  }
}`);
    expect(print(domainQueries[1].query)).toEqual(`query NameQuery {
  pokemons {
    results {
      id
      name
    }
  }
}`);

    expect(print(domainQueries[2].query)).toEqual(`query PlanetQuery {
  allPlanets {
    planets {
      id
      name
    }
  }
}`);
  });
});
