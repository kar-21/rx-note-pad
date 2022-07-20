import { ActionType, getType } from "typesafe-actions";
import * as commonStateAction from "../ActionCreators/commonState.actionCreators";
import { commonStateType } from "../Models/commonState.interface";

const initialState: commonStateType = {
  selectedNoteId: "",
};

type Action = ActionType<typeof commonStateAction>;

export const commonStateReducer = (
  state = initialState,
  action: Action = {} as Action
) => {
  switch (action.type) {
    case getType(commonStateAction.setSelectedNoteId):
      return {
        ...state,
        selectedNoteId: action.payload,
      };
    default:
      return state;
  }
};
