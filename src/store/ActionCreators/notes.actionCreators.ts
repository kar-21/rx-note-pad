import { NotesType } from './../Models/notes.interface';
import { createAction } from "typesafe-actions";

export const createNote = createAction("CREATE_NOTE")<string>();
export const updateNote = createAction("UPDATE_NOTE")<NotesType>();
