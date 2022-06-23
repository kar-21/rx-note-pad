import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LoginIcon from "@mui/icons-material/Login";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <h1>Welcome to Note Pad</h1>
      <p>Here you can save your notes.</p>
      <div className="button-container">
        <Button
          variant="contained"
          onClick={() => navigate("/new")}
          startIcon={<NoteAddIcon />}
        >
          New Notes
        </Button>
        <span className="button-separator">OR</span>
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
