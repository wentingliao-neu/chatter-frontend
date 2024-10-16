import { Avatar, Button, Stack, Typography } from "@mui/material";
import useGetMe from "../../hooks/useGetMe";
import { UploadFile } from "@mui/icons-material";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { commonFetch } from "../../utils/fetch";

export default function Profile() {
   const me = useGetMe();
   console.log(me);
   async function handleFileUpload(event: any) {
      try {
         const formData = new FormData();
         formData.append("file", event.target.files[0]);
         const res = await commonFetch(`${API_URL}/users/image`, {
            method: "POST",
            body: formData,
         });
         if (!res.ok) {
            throw new Error("Failed to upload image");
         }
         snackVar({ message: "Image uploaded successfully", type: "success" });
      } catch (error) {
         snackVar({
            message:
               "Error uploading file. The size of file must be under 100kb and the type must be .jpg",
            type: "error",
         });
      }
   }
   return (
      <Stack
         spacing={6}
         sx={{
            marginTop: "2.5rem",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <Typography variant="h1">{me?.data?.me.username}</Typography>
         <Avatar sx={{ width: 256, height: 256 }} src={me.data?.me.imageUrl} />
         <Button
            component="label"
            variant="contained"
            size="large"
            startIcon={<UploadFile />}
         >
            Upload Image
            <input type="file" hidden onChange={handleFileUpload} />
         </Button>
      </Stack>
   );
}
