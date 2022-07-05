import { createAction } from "typesafe-actions";

export const setUserName = createAction("SET_USER_NAME")<string>();
export const setJwtToken = createAction("SET_JWT_TOKEN")<string>();
