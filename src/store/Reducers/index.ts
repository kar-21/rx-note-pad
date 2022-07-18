import { commonStateType } from "./../Models/commonState.interace";
import { UserDetails } from "./../Models/userDetails.interface";
import { combineReducers } from "redux";
import { userDetailsReducer } from "./userDetails.reducer";
import { notesReducer } from "./notes.reducer";
import { NotesReducerType } from "../Models/notes.interface";
import { commonStateReducer } from "./commonState.reducer";

export interface RootState {
  userDetailsReducer: UserDetails;
  notesReducer: NotesReducerType;
  commonStateReducer: commonStateType;
}

const reducers = combineReducers({
  userDetailsReducer,
  notesReducer,
  commonStateReducer,
});

export default reducers;
