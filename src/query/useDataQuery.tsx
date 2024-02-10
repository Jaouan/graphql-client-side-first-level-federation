import {
  DocumentNode,
  useQuery,
  type QueryResult,
  type OperationVariables,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@apollo/client";
import { extractQueries } from "./domain-parser";
import { useContext, useMemo } from "react";
import { DataContext } from ".";
import deepmerge from "deepmerge";

/**
 * Defines a generic hook type that can represent both useQuery and useSuspenseQuery.
 */
type UseQueryHook = typeof useQuery | typeof useSuspenseQuery;

/**
 * Defines a generic query result type that can represent both QueryResult and UseSuspenseQueryResult.
 */
type GenericQueryResult<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
> = QueryResult<TData, TVariables> | UseSuspenseQueryResult<TData, TVariables>;

/**
 * Executes GraphQL queries using a specified Apollo Client hook and merges the results.
 * @param graphQlQuery The GraphQL query document or string.
 * @param variables Variables for the GraphQL query.
 * @param useQueryHook The Apollo Client hook to use for executing the query.
 * @returns The result of the GraphQL query after execution.
 */
function useGenericQuery<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  graphQlQuery: DocumentNode,
  variables: TVariables,
  queryHook: UseQueryHook
): GenericQueryResult<TData, TVariables> {
  const { clientByDomains } = useContext(DataContext);
  const domainQueries = useMemo(() => {
    const queries = extractQueries(graphQlQuery);
    console.debug("🌐 Queries:", queries);
    return queries;
  }, []);

  const callableQueryHook = queryHook as unknown as <TData>(
    query: DocumentNode,
    opts: Record<string, unknown>
  ) => TData;

  const results = domainQueries.map(({ domain, query }) =>
    callableQueryHook(query as DocumentNode, {
      client: clientByDomains[domain as string],
      variables,
    })
  ) as GenericQueryResult<TData, TVariables>[];

  const mergedResult = results.find((result) => result.error) ??
    results.find((result) => (result as { loading?: boolean }).loading) ?? {
      ...results[0],
      data: deepmerge.all(results.map((result) => result.data || {})),
    };

  return mergedResult as GenericQueryResult<TData, TVariables>;
}

export const useDataQuery = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  graphQlQuery: DocumentNode,
  variables: TVariables = {} as TVariables
): QueryResult<TData, TVariables> =>
  useGenericQuery(graphQlQuery, variables, useQuery) as QueryResult<
    TData,
    TVariables
  >;

export const useSuspenseDataQuery = <
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables
>(
  graphQlQuery: DocumentNode,
  variables: TVariables = {} as TVariables
): UseSuspenseQueryResult<TData, TVariables> =>
  useGenericQuery(
    graphQlQuery,
    variables,
    useSuspenseQuery
  ) as UseSuspenseQueryResult<TData, TVariables>;
