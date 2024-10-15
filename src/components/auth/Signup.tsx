import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink, TextField } from "@mui/material";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import extractErrorMessage from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";

export default function Signup() {
   const [createUser] = useCreateUser();
   const [username, setUserName] = useState<string>("");
   const [error, setError] = useState<string>("");
   const { login } = useLogin();
   return (
      <Auth
         submitLabel="Sign up"
         error={error}
         extraFields={
            <TextField
               type="text"
               label="username"
               variant="outlined"
               value={username}
               onChange={(e) => setUserName(e.target.value)}
               error={!!error}
               helperText={error}
            />
         }
         onSubmit={async ({ email, password }) => {
            try {
               await createUser({
                  variables: {
                     createUserInput: {
                        email,
                        username,
                        password,
                     },
                  },
               });
               await login({ email, password });
               setError("");
            } catch (error) {
               console.log(error);
               const errorMessage = extractErrorMessage(error);
               if (errorMessage) {
                  setError(errorMessage);
                  return;
               }
            }
         }}
      >
         <Link to="/login" style={{ alignSelf: "center" }}>
            <MUILink> Login</MUILink>
         </Link>
      </Auth>
   );
}
