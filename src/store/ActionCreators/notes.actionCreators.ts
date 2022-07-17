import { createAction } from "typesafe-actions";

import { NotesReducerType, NotesType } from "./../Models/notes.interface";

export const createNote = createAction("CREATE_NOTE")<string>();
export const updateNote = createAction("UPDATE_NOTE")<NotesType>();
export const getUserNotesSuccess = createAction(
  "GET_USER_NOTES_SUCCESS"
)<NotesReducerType>();
