import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { Capacitor } from "@capacitor/core";

const GRAPHQL_ENDPOINT = Capacitor.isNativePlatform()
  ? "https://hobhub-backend-production.up.railway.app/graphql"
  : import.meta.env.VITE_GRAPHQL_ENDPOINT;

console.log("GRAPHQL ENDPOINT:", GRAPHQL_ENDPOINT);

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
