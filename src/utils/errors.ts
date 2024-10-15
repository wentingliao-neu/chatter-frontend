export default function extractErrorMessage(err: any) {
   const errorMessage =
      err.graphQLErrors[0]?.extensions?.originalError?.message ||
      err.errors[0]?.extensions?.originalError?.message[0];
   if (Array.isArray(errorMessage)) {
      return errorMessage[0];
   }
   return errorMessage;
}
