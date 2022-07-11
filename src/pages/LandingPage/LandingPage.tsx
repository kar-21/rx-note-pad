import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LoginIcon from "@mui/icons-material/Login";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setJwtToken,
  setUserID,
} from "../../store/ActionCreators/userDetails.actionCreator";
import { RootState } from "../../store/Reducers";
import jwt_decode from "jwt-decode";
import { JwtType } from "../../store/Models/userDetails.interface";
import { getUserDetails } from "../../store/Actions/userDetails.action";
import { AnyAction } from "redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie] = useCookies(["token"]);

  const { jwtToken } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  useEffect(() => {
    if (cookie?.token) {
      dispatch(setJwtToken(cookie.token));
      const decode: JwtType = jwt_decode(cookie?.token);
      dispatch(setUserID(decode?.userId));
      dispatch(getUserDetails(decode?.userId) as unknown as AnyAction);
    }
  }, [dispatch, cookie]);

  return (
    <div className="landing-page-container">
      <h1>Welcome to Note Pad</h1>
      <p>Here you can save your notes.</p>
      <div className="button-container">
        <Button
          variant="contained"
          onClick={() => navigate("/saved")}
          startIcon={<NoteAddIcon />}
        >
          New Notes
        </Button>
        {jwtToken ? (
          <></>
        ) : (
          <>
            <span className="button-separator">OR</span>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
