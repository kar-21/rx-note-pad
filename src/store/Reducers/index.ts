import { UserDetails } from "./../Models/userDetails.interface";
import { combineReducers } from "redux";
import { userDetailsReducer } from "./userDetails.reducer";

export interface RootState {
  userDetailsReducer: UserDetails;
}

const reducers = combineReducers({
  userDetailsReducer,
});

export default reducers;
