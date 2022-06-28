import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import { getAPI } from "../../httpClient/httpClient";

const LoginPage = () => {
  const onGoogleLoginClick = () => {
    if (process.env.REACT_APP_BACKEND_API) {
      getAPI(process.env.REACT_APP_BACKEND_API).then(({ data, status }) => {
        if (status === 200) {
          window.location.replace(JSON.parse(data).redirectURL);
        }
      });
    }
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
