import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";
import { commonFetch } from "../utils/fetch";

export const useCountChats = () => {
   const [chatsCount, setChatsCount] = useState<number | undefined>();

   const countChats = useCallback(async () => {
      const res = await commonFetch(`${API_URL}/chats/count`, {
         method: "GET",
         headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
         snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
         return;
      }
      const data = await res.text();
      setChatsCount(parseInt(data));
   }, []);
   return { chatsCount, countChats };
};
