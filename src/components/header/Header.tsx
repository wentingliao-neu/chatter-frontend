import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./MobileNavigation";
import MobileBranding from "./MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { authenticatedVar } from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client";
import { Page } from "../../interfaces/page.interface";

const pages: Page[] = [{ title: "Home", path: "/" }];
const unauthenticatedPages: Page[] = [
   { title: "Login", path: "/login" },
   { title: "Signup", path: "/signup" },
];

export default function Header() {
   const authenticated = useReactiveVar(authenticatedVar);
   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <Branding />
               <MobileNavigation
                  pages={authenticated ? pages : unauthenticatedPages}
               />
               <MobileBranding />
               <Navigation
                  pages={authenticated ? pages : unauthenticatedPages}
               />
               {authenticated && <Settings />}
            </Toolbar>
         </Container>
      </AppBar>
   );
}
