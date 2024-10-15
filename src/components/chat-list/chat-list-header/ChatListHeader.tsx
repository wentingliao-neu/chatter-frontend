import { AddCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";

interface ChatListHeaderProps {
   handleAddChat: () => void;
}
export const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
   return (
      <AppBar position="static" color="transparent">
         <Toolbar>
            <IconButton size="large" edge="start" onClick={handleAddChat}>
               <AddCircle />
            </IconButton>
         </Toolbar>
      </AppBar>
   );
};
