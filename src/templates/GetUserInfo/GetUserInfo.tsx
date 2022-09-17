import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import jwt_decode from "jwt-decode";
import {
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
import { resetAlert } from "../../store/ActionCreators/commonState.actionCreators";

const GetUserInfo = () => {
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);

  const { jwtToken } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const { spinnerState, alertState } = useSelector(
    (state: RootState) => state.commonStateReducer
  );

  useEffect(() => {
    if (!jwtToken && cookie?.token) {
      dispatch(setJwtToken(cookie.token));
      const decode: JwtType = jwt_decode(cookie?.token);
      dispatch(setUserID(decode?.userId));
      dispatch(getUserDetails(decode?.userId) as unknown as AnyAction);
      dispatch(getUserNotes(decode?.userId) as unknown as AnyAction);
    } else {
      dispatch(
        saveLocalNote({
          ...welcomeNote,
          isSaved: false,
          dateOfCreation: new Date(Date.now()),
          dateOfModification: new Date(Date.now()),
        }) as unknown as AnyAction
      );
      dispatch(getAllLocalNotes() as unknown as AnyAction);
    }
  }, [dispatch, cookie, jwtToken]);

  return (
    <>
      {spinnerState.showSpinner && (
        <Modal
          open={spinnerState.showSpinner}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper className="spinner-paper">
            <CircularProgress color="success" />
            <span>{spinnerState.message}</span>
          </Paper>
        </Modal>
      )}
      {alertState.showAlert && (
        <Snackbar
          open={alertState.showAlert}
          autoHideDuration={100000}
          onClose={() => dispatch(resetAlert())}
        >
          <Alert
            severity={alertState.level}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={() => dispatch(resetAlert())}
              >
                <CloseIcon />
              </IconButton>
            }
          >
            {alertState.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default GetUserInfo;
