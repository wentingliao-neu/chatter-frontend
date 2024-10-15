import { useEffect } from "react";
import { excludedRoutes } from "../../constants/excluded-routes";
import useGetMe from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";

interface GuardProps {
   children: JSX.Element;
}

export default function Guard({ children }: GuardProps) {
   const { data: user, error } = useGetMe();
   const { path } = usePath();
   useEffect(() => {
      authenticatedVar(user ? true : false);
   }, [user]);
   useEffect(() => {
      if (error?.networkError) {
         snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      }
   }, [error]);
   return <>{(excludedRoutes.includes(path) || user) && children}</>;
}
