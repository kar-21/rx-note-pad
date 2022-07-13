import { createAction } from "typesafe-actions";

export const createNote = createAction("CREATE_NOTES")<string>();
