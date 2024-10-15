import { ChatListItem } from "./chat-list-item/ChatListItem";
import { ChatListHeader } from "./chat-list-header/ChatListHeader";
import { Box, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatListAdd } from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

export default function ChatList() {
   const [chatListAddVisible, setChatListAddVisible] = useState(false);
   const { data, fetchMore } = useGetChats({
      skip: 0,
      limit: PAGE_SIZE,
   });
   const [selectedChat, setSelectedChat] = useState<string>("");
   const { path } = usePath();
   useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });
   const { chatsCount, countChats } = useCountChats();
   useEffect(() => {
      countChats();
   }, [countChats]);
   useEffect(() => {
      const pathSplit = path.split("chats/");
      if (pathSplit.length > 1) {
         setSelectedChat(pathSplit[1]);
      }
   }, [path]);

   return (
      <>
         <ChatListAdd
            open={chatListAddVisible}
            handleClose={() => setChatListAddVisible(false)}
         />
         <Stack>
            <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
            <Divider />
            <Box
               sx={{
                  width: "100%",

                  bgcolor: "background.paper",
                  maxHeight: "80vh",
                  overflow: "auto",
               }}
            >
               <InfiniteScroll
                  pageStart={0}
                  loadMore={() =>
                     fetchMore({
                        variables: {
                           skip: data?.chats.length || 0,
                        },
                     })
                  }
                  hasMore={
                     data?.chats && chatsCount
                        ? data?.chats.length < chatsCount
                        : false
                  }
                  useWindow={false}
               >
                  {data?.chats ? (
                     [...data.chats]
                        .sort((chatA, chatB) => {
                           if (!chatA.latestMessage) return -1;
                           return (
                              new Date(
                                 chatA.latestMessage?.createdAt
                              ).getTime() -
                              new Date(chatB.latestMessage?.createdAt).getTime()
                           );
                        })
                        .map((chat) => (
                           <ChatListItem
                              key={chat._id}
                              chat={chat}
                              selected={chat._id === selectedChat}
                           />
                        ))
                        .reverse()
                  ) : (
                     <></>
                  )}
               </InfiniteScroll>
            </Box>
         </Stack>
      </>
   );
}
