import { UserDetails } from "./../Models/userDetails.interface";
import { combineReducers } from "redux";
import { userDetailsReducer } from "./userDetails.reducer";
import { notesReducer } from "./notes.reducer";
import { NotesReducerType } from "../Models/notes.interface";

export interface RootState {
  userDetailsReducer: UserDetails;
  notesReducer: NotesReducerType;
}

const reducers = combineReducers({
  userDetailsReducer,
  notesReducer,
});

export default reducers;
