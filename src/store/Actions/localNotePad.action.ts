import { Dispatch } from "redux";
import { generateInitialNote } from "../../services/GenerateInitialNote.service";
import sessionStore from "../../services/sessionStorage.service";
import { createNote } from "../ActionCreators/notes.actionCreators";
import { NotesType } from "../Models/notes.interface";

export const createNewLocalNote =
  (noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const newNote = generateInitialNote(noteId);
    sessionStore.setLocalNote(newNote);
    dispatch(createNote(noteId));
  };

export const saveLocalNote =
  (note: NotesType) =>
  async (dispatch: Dispatch): Promise<void> => {
    sessionStore.setLocalNote(note);
  };
