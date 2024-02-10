import { DataProvider } from "./query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SuspenseComponent } from "./components/SuspenseComponent";
import { MERGED_QUERY_STRING, URI_BY_DOMAINS } from "./config";

const App = () => (
  <DataProvider uriByDomains={URI_BY_DOMAINS}>
    <main>
      <section>
        <h2>Demo</h2>
        {/*<BasicHookComponent />*/}
        <ErrorBoundary
          fallback={
            <div className="error">(Suspense) Something went wrong</div>
          }
        >
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <SuspenseComponent />
          </Suspense>
        </ErrorBoundary>
      </section>
      <section>
        <h2>Usage</h2>
        <h3>Provider</h3>
        <pre>
          {`<DataProvider uriByDomains={${JSON.stringify(
            URI_BY_DOMAINS,
            null,
            2
          )}}>
  ...
</DataProvider>`}
        </pre>
        <h3>Hook</h3>
        <pre>{`const { data } = useSuspenseDataQuery(gql\`\n${MERGED_QUERY_STRING.split(
          "\n"
        )
          .map((line) => `   ${line}`)
          .join("\n")}\n\`);`}</pre>
      </section>
    </main>
  </DataProvider>
);

export default App;
