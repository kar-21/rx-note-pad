import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { AnyAction } from "redux";

import {
  setJwtToken,
  setUserID,
  setUserName,
} from "../../store/ActionCreators/userDetails.actionCreator";
import { JwtType } from "../../store/Models/userDetails.interface";
import { getUserDetails } from "../../store/Actions/userDetails.action";

const Token = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const dispatch = useDispatch();

  const [, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (token) {
      dispatch(setUserName("Jane Doe"));
      dispatch(setJwtToken(token));
      const decode: JwtType = jwt_decode(token);
      dispatch(setUserID(decode?.userId));
      dispatch(getUserDetails(decode?.userId) as unknown as AnyAction);
      setCookie("token", token, { path: "/" });
      navigate("/saved");
    }
  }, [dispatch, navigate, setCookie, token]);

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
