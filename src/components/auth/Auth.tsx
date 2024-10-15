import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useGetMe from "../../hooks/useGetMe";
import { useNavigate } from "react-router-dom";

interface AuthProps {
   submitLabel: string;
   onSubmit: (credentials: {
      email: string;
      password: string;
   }) => Promise<void>;
   children: React.ReactNode;
   extraFields?: React.ReactNode;
   error?: string;
}

export default function Auth({
   submitLabel,
   onSubmit,
   children,
   extraFields,
   error,
}: AuthProps) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { data } = useGetMe();
   const navigate = useNavigate();

   useEffect(() => {
      if (data) {
         navigate("/");
      }
   }, [data, navigate]);
   return (
      <Stack
         spacing={3}
         sx={{
            height: "100vh",
            maxWidth: 360,
            margin: "0 auto",
            justifyContent: "center",
         }}
      >
         <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
         />
         {extraFields}
         <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
         />
         <Button
            variant="contained"
            onClick={() => onSubmit({ email, password })}
         >
            {submitLabel}
         </Button>
         {children}
      </Stack>
   );
}
