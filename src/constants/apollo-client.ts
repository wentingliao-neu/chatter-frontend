import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { onError } from "@apollo/client/link/error";
import { API_URL, WS_URL } from "./urls";
import { excludedRoutes } from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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
         console.log(window.location.pathname);
         console.log(excludedRoutes);
         if (!excludedRoutes.includes(window.location.pathname)) {
            console.log("logout executed");
            onLogout();
         } else {
            console.log("logout not executed");
            return;
         }
      }
   } catch (err) {
      console.log(err);
   }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });
const wsLink = new GraphQLWsLink(
   createClient({ url: `ws://${WS_URL}/graphql` })
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
   link: logoutLink.concat(splitLink),
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
