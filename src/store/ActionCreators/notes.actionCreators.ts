import { createAction } from "typesafe-actions";

import {
  CreateNotePadType,
  NotesReducerType,
  NotesType,
} from "./../Models/notes.interface";

export const createNote = createAction("CREATE_NOTE")<CreateNotePadType>();
export const updateNote = createAction("UPDATE_NOTE")<NotesType>();
export const getUserNotesSuccess = createAction(
  "GET_USER_NOTES_SUCCESS"
)<NotesReducerType>();
export const updateNotesFromLocal = createAction(
  "UPDATE_NOTES_FROM_LOCAL"
)<NotesReducerType>();
export const deleteLocalNoteSuccess = createAction(
  "DELETE_LOCAL_NOTE_SUCCESS"
)<string>();
