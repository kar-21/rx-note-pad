import { NotesReducerType } from "./../Models/notes.interface";
import { ActionType, getType } from "typesafe-actions";
import * as notesAction from "../ActionCreators/notes.actionCreators";
import { generateInitialNote } from "../../services/GenerateInitialNote.service";

const initialState: NotesReducerType = {};

type Action = ActionType<typeof notesAction>;

export const notesReducer = (
  state = initialState,
  action: Action = {} as Action
) => {
  switch (action.type) {
    case getType(notesAction.createNote):
      return {
        ...state,
        [action.payload]: generateInitialNote(action.payload),
      };
    case getType(notesAction.updateNote):
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};
