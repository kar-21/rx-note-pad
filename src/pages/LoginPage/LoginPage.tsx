import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { useNavigate } from "react-router-dom";

import { redirectOauth2URI } from "../../store/Actions/userDetails.action";
import { RootState } from "../../store/Reducers";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { jwtToken } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const onGoogleLoginClick = () => {
    dispatch(redirectOauth2URI() as unknown as AnyAction);
  };

  return (
    <div className="login-page-container">
      {jwtToken ? (
        <>
          <h1>You are already logged in</h1>
          <Button
            variant="contained"
            onClick={() => navigate("/saved")}
            startIcon={<NoteAddIcon />}
          >
            New Notes
          </Button>
        </>
      ) : (
        <>
          <h1>Login with</h1>
          <IconButton
            className="login-icon"
            color="primary"
            onClick={onGoogleLoginClick}
          >
            <GoogleIcon fontSize="inherit" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default LoginPage;
