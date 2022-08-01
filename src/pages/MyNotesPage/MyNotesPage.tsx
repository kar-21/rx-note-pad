import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import NewNoteCard from "../../templates/NewNoteCard/NewNoteCard";
import NoteCard from "../../templates/NoteCard/NoteCard";

const SavedNotes = () => {
  const notes = useSelector((state: RootState) => state.notesReducer);

  return (
    <div className="saved-notes-page-container">
      <h1>Saved Notes</h1>
      <Box className="saved-notes-card-container">
        {Object.values(notes).map((note) => (
          <>
            <NoteCard key={note.id} noteFromRedux={note} />
          </>
        ))}
        <NewNoteCard />
      </Box>
    </div>
  );
};

export default SavedNotes;
