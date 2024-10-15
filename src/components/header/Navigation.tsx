import { Button } from "@mui/material";

import { Box } from "@mui/material";
import { Page } from "../../interfaces/page.interface";
import { router } from "../Routes";

const Navigation = ({ pages }: { pages: Page[] }) => {
   return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
         {pages.map((page) => (
            <Button
               key={page.title}
               sx={{ my: 2, color: "white", display: "block" }}
               onClick={() => router.navigate(page.path)}
            >
               {page.title}
            </Button>
         ))}
      </Box>
   );
};

export default Navigation;
