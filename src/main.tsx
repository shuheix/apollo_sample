import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Room } from "./Room.tsx";
import { createConsumer } from "@rails/actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

// https://www.apollographql.com/docs/react/api/link/apollo-link-http#httplink-constructor-options
const cable = createConsumer();

const primaryLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const actionCableLink = new ActionCableLink({ cable });

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription",
  );
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  actionCableLink,
  primaryLink,
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
