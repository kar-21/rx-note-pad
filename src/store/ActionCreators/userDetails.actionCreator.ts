import { createAction } from "typesafe-actions";

export const setUserName = createAction("SET_USER_NAME")<string>();
export const setJwtToken = createAction("SET_JWT_TOKEN")<string>();
export const setUserID = createAction("SET_USER_ID")<string>();
export const getUserDetailsSuccess = createAction("GET_USER_DETAILS_SUCCESS")<any>();
