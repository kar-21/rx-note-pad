import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import jwt_decode from "jwt-decode";

import {
  setJwtToken,
  setUserID,
} from "../../store/ActionCreators/userDetails.actionCreator";
import { getUserNotes } from "../../store/Actions/notePad.action";
import { getUserDetails } from "../../store/Actions/userDetails.action";
import { JwtType } from "../../store/Models/userDetails.interface";
import { RootState } from "../../store/Reducers";
import {
  getAllLocalNotes,
  saveLocalNote,
} from "../../store/Actions/localNotePad.action";
import welcomeNote from "../../assets/WelcomeNote.json";

const GetUserInfo = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);

  const { jwtToken } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  useEffect(() => {
    if (!jwtToken && cookie?.token) {
      dispatch(setJwtToken(cookie.token));
      const decode: JwtType = jwt_decode(cookie?.token);
      dispatch(setUserID(decode?.userId));
      dispatch(getUserDetails(decode?.userId) as unknown as AnyAction);
      dispatch(getUserNotes(decode?.userId) as unknown as AnyAction);
    } else {
      dispatch(saveLocalNote(welcomeNote) as unknown as AnyAction);
      dispatch(getAllLocalNotes() as unknown as AnyAction);
    }
  }, [dispatch, cookie, jwtToken]);

  return <></>;
};

export default GetUserInfo;
