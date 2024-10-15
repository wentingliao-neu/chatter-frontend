import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
   Avatar,
   Box,
   ListItemAvatar,
   ListItemButton,
   Typography,
} from "@mui/material";
import { router } from "../../Routes";
import { ChatQuery } from "../../../gql/graphql";
import "./ChatListItem.css";

interface ChatListItemProps {
   chat: ChatQuery["chat"];
   selected: boolean;
}
export const ChatListItem = ({ chat, selected }: ChatListItemProps) => {
   return (
      <>
         <ListItem alignItems="flex-start" disablePadding>
            <ListItemButton
               onClick={() => {
                  router.navigate(`/chats/${chat._id}`);
               }}
               selected={selected}
            >
               <ListItemAvatar>
                  <Avatar
                     alt="Remy Sharp"
                     src={chat.latestMessage?.user.imageUrl}
                  />
               </ListItemAvatar>
               <ListItemText
                  primary={chat.name}
                  secondary={
                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "row",
                           gap: "0.5rem",
                        }}
                     >
                        <>
                           <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                 color: "text.primary",
                                 display: "inline",
                              }}
                           >
                              {chat.latestMessage
                                 ? chat.latestMessage?.user.username
                                 : " "}
                           </Typography>
                           <div className="content">
                              {" " + chat.latestMessage
                                 ? chat.latestMessage?.content
                                 : ""}
                           </div>
                        </>
                     </Box>
                  }
               />
            </ListItemButton>
         </ListItem>
         <Divider variant="inset" />
      </>
   );
};
