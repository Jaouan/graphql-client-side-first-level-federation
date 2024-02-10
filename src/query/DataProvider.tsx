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
    clientByDomains: Record<string, ApolloClient<unknown>>;
  }
);

export const DataProvider = ({
  uriByDomains,
  children,
}: {
  uriByDomains: Record<string, string>;
  children: ReactNode;
}) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    console.log("🔵", print(operation.query));
    return forward(operation);
  });

  const clientByDomains = Object.fromEntries(
    Object.entries(uriByDomains).map(([domain, uri]) => [
      domain,
      new ApolloClient({
        cache: new InMemoryCache(),
        link: concat(authMiddleware, new HttpLink({ uri })),
      }),
    ])
  );

  return (
    <DataContext.Provider value={{ clientByDomains }}>
      {children}
    </DataContext.Provider>
  );
};
