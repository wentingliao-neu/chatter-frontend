import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";

export const useCountMessages = (chatId: string) => {
   const [messagesCount, setMessagesCount] = useState<number | undefined>();

   const countMessages = useCallback(async () => {
      const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);
      if (!res.ok) {
         snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
         return;
      }
      try {
         const { messages } = await res.json();
         setMessagesCount(messages);
      } catch (error) {
         console.log(error);
         setMessagesCount(0);
      }
   }, [chatId]);
   return { messagesCount, countMessages };
};
