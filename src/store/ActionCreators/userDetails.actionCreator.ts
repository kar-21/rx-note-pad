import { createAction } from "typesafe-actions";

export const setUserName = createAction("SET_USER_NAME")<string>();
