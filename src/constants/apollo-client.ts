import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { onError } from "@apollo/client/link/error";
import { API_URL, WS_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../utils/token";

const logoutLink = onError((error) => {
   try {
      if (
         error.graphQLErrors?.length &&
         (
            error?.graphQLErrors[0]?.extensions?.originalError as {
               statusCode: number;
            }
         ).statusCode === 401
      ) {
         if (!excludedRoutes.includes(window.location.pathname)) {
            onLogout();
         } else {
            return;
         }
      }
   } catch (err) {
      console.log(err);
   }
});

const authLink = setContext((_, { headers }) => {
   return { headers: { ...headers, authorization: getToken() } };
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });
const wsLink = new GraphQLWsLink(
   createClient({
      url: `${WS_URL}/graphql`,
      connectionParams: { token: getToken() },
   })
);

const splitLink = split(
   ({ query }) => {
      const definition = getMainDefinition(query);
      return (
         definition.kind === "OperationDefinition" &&
         definition.operation === "subscription"
      );
   },
   wsLink,
   httpLink
);
const client = new ApolloClient({
   cache: new InMemoryCache({
      typePolicies: {
         Query: {
            fields: {
               chats: {
                  keyArgs: false,
                  merge,
               },
               messages: {
                  keyArgs: ["chatId"],
                  merge,
               },
            },
         },
      },
   }),
   link: logoutLink.concat(authLink).concat(splitLink),
   defaultOptions: {
      watchQuery: {
         errorPolicy: "ignore",
      },
      query: {
         errorPolicy: "ignore",
      },
   },
});

function merge(existing: any, incoming: any, { args }: any) {
   const merged = existing ? existing.slice(0) : [];
   for (let i = 0; i < incoming.length; i++) {
      merged[args.skip + i] = incoming[i];
   }
   return merged;
}

export default client;
