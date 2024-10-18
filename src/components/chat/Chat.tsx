import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
   InputBase,
   Divider,
   Paper,
   Stack,
   IconButton,
   Box,
   Grid,
   Avatar,
   Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

export const Chat = () => {
   const params = useParams();
   const [message, setMessage] = useState("");
   const chatId = params._id!;
   const { data } = useGetChat({ _id: chatId });
   const [createMessage] = useCreateMessage();
   const [skip, setSkip] = useState(0);
   const { data: messages, fetchMore } = useGetMessages({
      chatId,
      skip,
      limit: 15,
   });
   const divRef = useRef<HTMLDivElement | null>(null);
   const location = useLocation();

   const { messagesCount, countMessages } = useCountMessages(chatId);
   useEffect(() => {
      countMessages();
   }, [countMessages]);

   function scrollToBottom() {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
   }
   useEffect(() => {
      setMessage("");
      scrollToBottom();
   }, []);

   useEffect(() => {
      if (messages?.messages && messages.messages.length <= PAGE_SIZE) {
         setMessage("");
         scrollToBottom();
      }
   }, [location.pathname, messages]);

   async function handleCreateMessage() {
      await createMessage({
         variables: {
            createMessageInput: {
               content: message,
               chatId,
            },
         },
      });
      setMessage("");
      scrollToBottom();
   }
   return (
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
         <h1>{data?.chat?.name}</h1>
         <Box sx={{ height: "75vh", overflow: "auto" }}>
            <InfiniteScroll
               pageStart={1}
               isReverse={true}
               loadMore={() => {
                  if (skip > 0) {
                     fetchMore({
                        variables: { skip },
                     });
                  }

                  setSkip(messages?.messages.length || 0);
               }}
               hasMore={
                  messages && messagesCount
                     ? messages?.messages.length < messagesCount
                     : false
               }
               useWindow={false}
            >
               {messages ? (
                  [...messages.messages]
                     .sort(
                        (messageA, messageB) =>
                           new Date(messageA.createdAt).getTime() -
                           new Date(messageB.createdAt).getTime()
                     )
                     .map((message) => (
                        <Grid
                           container
                           alignItems="center"
                           marginBottom="1rem"
                           key={message._id}
                        >
                           <Grid item xs={2} lg={1}>
                              <Stack
                                 alignItems="center"
                                 justifyContent="center"
                                 spacing={1}
                              >
                                 <Avatar
                                    src={message.user.imageUrl}
                                    sx={{ width: 52, height: 52 }}
                                 />
                                 <Typography variant="caption">
                                    {message.user.username}
                                 </Typography>
                              </Stack>
                           </Grid>
                           <Grid item xs={10} lg={11}>
                              <Stack>
                                 <Paper sx={{ width: "fit-content" }}>
                                    <Typography sx={{ padding: "0.9rem" }}>
                                       {message.content}
                                    </Typography>
                                 </Paper>
                                 <Typography
                                    variant="caption"
                                    sx={{ marginLeft: "0.25rem" }}
                                 >
                                    {new Date(
                                       message.createdAt
                                    ).toLocaleTimeString()}
                                    -
                                    {new Date(
                                       message.createdAt
                                    ).toLocaleDateString()}
                                 </Typography>
                              </Stack>
                           </Grid>
                        </Grid>
                     ))
               ) : (
                  <></>
               )}

               <div ref={divRef}> </div>
            </InfiniteScroll>
         </Box>
         <Paper
            sx={{
               p: "4px",
               display: "flex",
               justifySelf: "flex-end",
               alignItems: "center",
               width: "100%",
               margin: "1rem 0",
            }}
         >
            <InputBase
               sx={{ ml: 1, flex: 1, width: "100%" }}
               placeholder="Message"
               onChange={(e) => setMessage(e.target.value)}
               value={message}
               onKeyDown={async (event) => {
                  if (event.key === "Enter" && message) handleCreateMessage();
               }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
               onClick={handleCreateMessage}
               color="primary"
               sx={{ p: "10px" }}
            >
               <SendIcon />
            </IconButton>
         </Paper>
      </Stack>
   );
};
