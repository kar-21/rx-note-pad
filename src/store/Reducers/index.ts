import { UserDetails } from "./../Models/userDetails.interface";
import { combineReducers } from "redux";
import { userDetailsReducer } from "./userDetails.reducer";
import { notesReducer } from "./notes.reducer";

export interface RootState {
  userDetailsReducer: UserDetails;
}

const reducers = combineReducers({
  userDetailsReducer,
  notesReducer,
});

export default reducers;
