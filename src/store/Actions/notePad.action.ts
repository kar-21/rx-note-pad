import { NotesType } from "./../Models/notes.interface";
import { generateInitialNote } from "./../../services/GenerateInitialNote.service";
import { AnyAction } from "redux";
import { Dispatch } from "redux";

import {
  deleteAPI,
  getAPI,
  patchAPI,
  postAPI,
} from "../../httpClient/httpClient";
import { NotesA2OTransformService } from "../../services/NotesA2OTransform.service";
import {
  createNote,
  getUserNotesSuccess,
} from "../ActionCreators/notes.actionCreators";

export const getUserNotes =
  (userId: string) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    const notesResponse = await getAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`
    );
    if (notesResponse.status === 200) {
      dispatch(
        getUserNotesSuccess(NotesA2OTransformService(notesResponse.data))
      );
    }
  };

export const createNewNote =
  (userId: string, noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const newNote = generateInitialNote(noteId);
    console.log(">>>", newNote);
    const notesResponse = await postAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`,
      newNote
    );
    if (notesResponse.status === 200) {
      dispatch(createNote(noteId));
    }
  };

export const saveNote =
  (userId: string, note: NotesType) =>
  async (dispatch: Dispatch): Promise<void> => {
    const notesResponse = await patchAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`,
      note
    );
    if (notesResponse.status === 200) {
      console.log(">> successful");
    }
  };

export const deleteNote =
  (userId: string, noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const noteDeleteResponse = await deleteAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`,
      { noteId }
    );
    if (noteDeleteResponse.status === 200) {
      const notesGetResponse = await getAPI(
        `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`
      );
      if (notesGetResponse.status === 200) {
        dispatch(
          getUserNotesSuccess(NotesA2OTransformService(notesGetResponse.data))
        );
      }
    }
  };
