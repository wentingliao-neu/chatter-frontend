import {
   Box,
   Modal,
   Typography,
   TextField,
   Button,
   Stack,
} from "@mui/material";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import { router } from "../../Routes";

interface ChatListAddProps {
   open: boolean;
   handleClose: () => void;
}
export const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
   const [error, setError] = useState("");
   const [createChat] = useCreateChat();
   const [name, setName] = useState<string>("");

   const onClose = () => {
      setError("");
      setName("");

      handleClose();
   };

   return (
      <Modal open={open} onClose={onClose}>
         <Box
            sx={{
               width: "400px",
               border: "2px solid #000",
               p: 4,
               bgcolor: "background.paper",
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
            }}
         >
            <Stack spacing={2}>
               <Typography variant="h6" component="h2">
                  Add Chat
               </Typography>

               <TextField
                  placeholder="Name of chat"
                  error={!!error}
                  helperText={error}
                  onChange={(event) => setName(event.target.value)}
               />

               <Button
                  variant="outlined"
                  onClick={async () => {
                     if (!name.length) {
                        setError("Chat name should not be empty");
                        return;
                     }
                     try {
                        const chat = await createChat({
                           variables: {
                              createChatInput: {
                                 name,
                              },
                           },
                        });
                        onClose();
                        router.navigate(`/chats/${chat.data?.createChat._id}`);
                     } catch (error) {
                        setError(UNKNOWN_ERROR_MESSAGE);
                     }
                  }}
               >
                  Save
               </Button>
            </Stack>
         </Box>
      </Modal>
   );
};
