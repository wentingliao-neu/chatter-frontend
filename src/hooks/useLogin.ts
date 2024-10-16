import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors";
import { setToken } from "../utils/token";
import { commonFetch } from "../utils/fetch";

interface LoginRequest {
   email: string;
   password: string;
}

export const useLogin = () => {
   const [error, setError] = useState<string>("");
   const login = async (loginRequest: LoginRequest) => {
      const response = await commonFetch(`${API_URL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(loginRequest),
      });
      if (!response.ok) {
         setError(
            response.status === 401
               ? "Invalid email or password"
               : UNKNOWN_ERROR_MESSAGE
         );
         return;
      }
      setToken(await response.text());
      setError("");
      await client.refetchQueries({ include: "active" });
   };
   return { login, error };
};
