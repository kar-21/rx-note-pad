import { createAction } from "typesafe-actions";

export const setSelectedNoteId = createAction("SET_SELECTED_NOTE_ID")<string>();