import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, from} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: process.env.STRAPI_ADDRESS })

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
});

export default client;