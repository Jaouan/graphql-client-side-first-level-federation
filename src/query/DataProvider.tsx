import { ReactNode, createContext } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { print } from "@apollo/client/utilities";

export const DataContext = createContext(
  {} as {
    clientByFirstLevelFields: Record<string, ApolloClient<unknown>>;
  }
);

export const DataProvider = ({
  uriByFirstLevelFields,
  children,
}: {
  uriByFirstLevelFields: Record<string, string>;
  children: ReactNode;
}) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    console.log("🔵", print(operation.query));
    return forward(operation);
  });

  const clientByFirstLevelFields = Object.fromEntries(
    Object.entries(uriByFirstLevelFields).map(([firstLevelField, uri]) => [
      firstLevelField,
      new ApolloClient({
        cache: new InMemoryCache(),
        link: concat(authMiddleware, new HttpLink({ uri })),
      }),
    ])
  );

  return (
    <DataContext.Provider value={{ clientByFirstLevelFields }}>
      {children}
    </DataContext.Provider>
  );
};
