import { combineReducers } from "redux";
import { userDetailsReducer } from "./userDetails.reducer";

const reducers = combineReducers({
  userDetailsReducer,
});

export default reducers;
