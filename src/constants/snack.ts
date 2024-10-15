import { makeVar } from "@apollo/client";
import { SnackMessage } from "../interfaces/snack-message";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
