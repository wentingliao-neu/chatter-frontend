import { SnackMessage } from "../interfaces/snack-message";

export const UNKNOWN_ERROR_MESSAGE = "Something went wrong";

export const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
   message: UNKNOWN_ERROR_MESSAGE,
   type: "error",
};
