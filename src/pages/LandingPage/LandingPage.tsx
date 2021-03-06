import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LoginIcon from "@mui/icons-material/Login";
import { RootState } from "../../store/Reducers";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();

  const { jwtToken } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  return (
    <div className="landing-page-container">
      <h1>Welcome to Note Pad</h1>
      <p>Here you can save your notes.</p>
      <div className="button-container">
        <Button
          variant="contained"
          onClick={() => navigate("/my-notes")}
          startIcon={<NoteAddIcon />}
        >
          My Notes
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
