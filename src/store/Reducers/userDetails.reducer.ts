import { ActionType, getType } from "typesafe-actions";
import { UserDetails } from "../Models/userDetails.interface";
import * as userDetailsAction from "../ActionCreators/userDetails.actionCreator";

const initialState: UserDetails = {
  userName: "",
  jwtToken: "",
};

type Action = ActionType<typeof userDetailsAction>;

export const userDetailsReducer = (
  state = initialState,
  action: Action = {} as Action
) => {
  switch (action.type) {
    case getType(userDetailsAction.setUserName):
      return {
        ...state,
        userName: action.payload,
      };
    case getType(userDetailsAction.setJwtToken):
      return {
        ...state,
        jwtToken: action.payload,
      };
    default:
      return state;
  }
};
