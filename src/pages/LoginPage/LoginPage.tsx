import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <h1>Login with</h1>
      <IconButton
        className="login-icon"
        color="primary"
        onClick={() => console.log("login google")}
      >
        <GoogleIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default LoginPage;
