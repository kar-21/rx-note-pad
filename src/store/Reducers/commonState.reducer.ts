import { ActionType, getType } from "typesafe-actions";
import * as commonStateAction from "../ActionCreators/commonState.actionCreators";
import { AlertLevel, CommonStateType } from "../Models/commonState.interface";

const initialState: CommonStateType = {
  selectedNoteId: "",
  spinnerState: {
    showSpinner: false,
    message: "",
  },
  alertState: {
    showAlert: false,
    message: "",
    level: AlertLevel.info,
  },
};

type Action = ActionType<typeof commonStateAction>;

export const commonStateReducer = (
  state = initialState,
  action: Action = {} as Action
): CommonStateType => {
  switch (action.type) {
    case getType(commonStateAction.setSelectedNoteId):
      return {
        ...state,
        selectedNoteId: action.payload,
      };
    case getType(commonStateAction.setSpinner):
      return {
        ...state,
        spinnerState: { showSpinner: true, message: action.payload },
      };
    case getType(commonStateAction.resetSpinner):
      return {
        ...state,
        spinnerState: initialState.spinnerState,
      };
    case getType(commonStateAction.setAlert):
      return {
        ...state,
        alertState: {
          showAlert: true,
          message: action.payload.message,
          level: action.payload.level,
        },
      };
    case getType(commonStateAction.resetAlert):
      return {
        ...state,
        alertState: initialState.alertState,
      };
    default:
      return state;
  }
};
