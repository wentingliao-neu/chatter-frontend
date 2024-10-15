import { Link } from "react-router-dom";
import Auth from "./Auth";
import { Link as MUILink } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
   const { login, error } = useLogin();
   return (
      <Auth
         submitLabel="Login"
         onSubmit={(request) => login(request)}
         error={error ? "Credentials are not valid" : ""}
      >
         <Link to="/signup" style={{ alignSelf: "center" }}>
            <MUILink>Sign up</MUILink>
         </Link>
      </Auth>
   );
}
