import { Dispatch } from "redux";
import { generateInitialNote } from "../../services/GenerateInitialNote.service";
import sessionStore from "../../services/sessionStorage.service";
import {
  createNote,
  getUserNotesSuccess,
} from "../ActionCreators/notes.actionCreators";
import { NotesType } from "../Models/notes.interface";

export const getAllLocalNotes =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(getUserNotesSuccess(sessionStore.getAllLocalNote()));
  };

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

export const deleteLocalNote =
  (noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    sessionStore.removeLocalNote(noteId);
    dispatch(getUserNotesSuccess(sessionStore.getAllLocalNote()));
  };
