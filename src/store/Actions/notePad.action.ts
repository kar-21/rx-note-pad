import { generateInitialNote } from "./../../services/GenerateInitialNote.service";
import { AnyAction } from "redux";
import { Dispatch } from "redux";

import { getAPI, postAPI } from "../../httpClient/httpClient";
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
        getUserNotesSuccess(
          NotesA2OTransformService(notesResponse.data)
        )
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
