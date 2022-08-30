import { Dispatch } from "redux";
import { generateInitialNote } from "../../services/GenerateInitialNote.service";
import sessionStore from "../../services/sessionStorage.service";
import { createNote } from "../ActionCreators/notes.actionCreators";

export const createNewLocalNote =
  (noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const newNote = generateInitialNote(noteId);
    sessionStore.setLocalNote(newNote);
    dispatch(createNote(noteId));
  };
