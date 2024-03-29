import {
  Kind,
  FieldNode,
  DocumentNode,
  OperationDefinitionNode,
  OperationTypeNode,
} from "graphql";
import { gql } from "@apollo/client";
import { print } from "@apollo/client/utilities";

type FirstLevelFieldQuery = {
  firstLevelField: string;
  query: DocumentNode;
};

/**
 * Extracts firstLevelField-specific queries from an operation definition node.
 * @param queryAst The operation definition node to extract from.
 * @returns An array of firstLevelField queries.
 */
export const extractFirstLevelFieldQueries = (
  queryAst: OperationDefinitionNode
): FirstLevelFieldQuery[] =>
  queryAst.selectionSet.selections
    .filter(
      (selectionAst): selectionAst is FieldNode =>
        selectionAst.kind === Kind.FIELD
    )
    .map((fieldAst) => ({
      firstLevelField: fieldAst.name.value,
      // Reparse the query to avoid a bug in Apollo Client.
      query: gql(
        print({
          kind: Kind.DOCUMENT,
          definitions: [
            {
              ...queryAst,
              selectionSet: {
                kind: Kind.SELECTION_SET,
                selections: [fieldAst],
              },
            },
          ],
        })
      ),
    }));

/**
 * Extracts queries for different firstLevelFields from a unified GraphQL query.
 * @param unifiedQuery The unified query document node or query string.
 * @returns A record of firstLevelField queries.
 */
export const extractQueries = (
  unifiedQuery: DocumentNode
): FirstLevelFieldQuery[] =>
  unifiedQuery.definitions
    .filter(
      (definition): definition is OperationDefinitionNode =>
        definition.kind === Kind.OPERATION_DEFINITION &&
        definition.operation === OperationTypeNode.QUERY
    )
    .flatMap(extractFirstLevelFieldQueries);
