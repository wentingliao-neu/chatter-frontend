import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getMeDocument = graphql(`
   query GetMe {
      me {
         ...UserFragment
      }
   }
`);
export default function useGetMe() {
   return useQuery(getMeDocument);
}
