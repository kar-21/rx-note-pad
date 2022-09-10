import { createAction } from "typesafe-actions";
import { SetAlertPayload } from "../Models/commonState.interface";

export const setSelectedNoteId = createAction("SET_SELECTED_NOTE_ID")<string>();
export const setSpinner = createAction("SET_SPINNER")<string>();
export const setAlert = createAction("SET_ALERT")<SetAlertPayload>();
export const resetSpinner = createAction("RESET_SPINNER")();
export const resetAlert = createAction("RESET_ALERT")();