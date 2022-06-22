import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page-container">
      <h1>Welcome to Note Pad</h1>
      <p>Here you can save your notes.</p>
      <Button
        variant="contained"
        onClick={() => navigate("/new")}
        className="new-notes-button"
        startIcon={<NoteAddIcon />}
      >
        New Notes
      </Button>
    </div>
  );
};

export default LandingPage;
