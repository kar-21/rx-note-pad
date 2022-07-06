import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { redirectOauth2URI } from "../../store/Actions/userDetails.action";
import { AnyAction } from "redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onGoogleLoginClick = () => {
    dispatch(redirectOauth2URI() as unknown as AnyAction);
  };

  return (
    <div className="login-page-container">
      <h1>Login with</h1>
      <IconButton
        className="login-icon"
        color="primary"
        onClick={onGoogleLoginClick}
      >
        <GoogleIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default LoginPage;
