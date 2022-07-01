import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, CircularProgress } from "@mui/material";

const Token = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (token) {
      setCookie("token", token, { path: "/" });
      navigate("/saved");
    }
  }, [navigate, setCookie, token]);

  return (
    <div className="token-page-container">
      <Box className="spinner" sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      <h1>Loading...</h1>
    </div>
  );
};

export default Token;
