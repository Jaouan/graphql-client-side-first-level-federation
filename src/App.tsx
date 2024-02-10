import "./App.css";

import { DataProvider } from "./query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseComponent } from "./components/SuspenseComponent";
import { MERGED_QUERY_STRING, URI_BY_DOMAINS } from "./config";
// import { BasicHookComponent } from "./components/BasicHookComponent";

const App = () => (
  <DataProvider uriByDomains={URI_BY_DOMAINS}>
    <main>
      {/*<h1>Basic hook</h1>
      <BasicHookComponent />*/}
      <h1>"First-level" GraphQL Federation</h1>
      <ErrorBoundary fallback={<div>(Suspense) Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <SuspenseComponent />
        </Suspense>
      </ErrorBoundary>
      <h1>Config</h1>
      <div>
        <pre>{JSON.stringify(URI_BY_DOMAINS, null, 2)}</pre>
        <pre>{`const { data } = useSuspenseDataQuery(gql\`\n${MERGED_QUERY_STRING.split(
          "\n"
        )
          .map((line) => `   ${line}`)
          .join("\n")}\n\`);`}</pre>
      </div>
    </main>
  </DataProvider>
);

export default App;
