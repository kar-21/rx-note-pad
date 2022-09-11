import {
  resetSpinner,
  setSpinner,
} from "./../ActionCreators/commonState.actionCreators";
import { updateNotesFromLocal } from "./../ActionCreators/notes.actionCreators";
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
import sessionStore from "../../services/sessionStorage.service";

export const getUserNotes =
  (userId: string) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
      dispatch(setSpinner("Fetching Notes..."));
      const notesResponse = await getAPI(
        `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`
      );
      if (notesResponse.status === 200) {
        dispatch(
          getUserNotesSuccess(
            NotesA2OTransformService(notesResponse.data, true)
          )
        );
      }
    } catch (error) {
      console.log(">>>>>", JSON.stringify(error));
    } finally {
      dispatch(updateNotesFromLocal(sessionStore.getAllLocalNote()));
      dispatch(resetSpinner());
    }
  };

export const createNewNote =
  (userId: string, noteId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    const newNote = generateInitialNote(noteId, true);
    console.log(">>>", newNote);
    const notesResponse = await postAPI(
      `${process.env.REACT_APP_BACKEND_API}/notepad/${userId}`,
      newNote
    );
    if (notesResponse.status === 200) {
      dispatch(createNote({ id: noteId, isSaved: true }));
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
