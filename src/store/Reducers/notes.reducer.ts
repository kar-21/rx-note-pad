import { NotesReducerType, NotesType } from "./../Models/notes.interface";
import { ActionType, getType } from "typesafe-actions";
import * as notesAction from "../ActionCreators/notes.actionCreators";

const initialState: NotesReducerType = {};

const generateInitialNoteObject = (id: string): NotesType => ({
  id,
  title: "",
  content: "",
  color: "#F5F5F5",
});

type Action = ActionType<typeof notesAction>;

export const notesReducer = (
  state = initialState,
  action: Action = {} as Action
) => {
  switch (action.type) {
    case getType(notesAction.createNote):
      return {
        ...state,
        [action.payload]: generateInitialNoteObject(action.payload),
      };
    default:
      return state;
  }
};
