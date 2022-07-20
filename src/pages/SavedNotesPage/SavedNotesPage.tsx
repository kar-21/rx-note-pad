import { useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import NoteCard from "../../templates/NoteCard/NoteCard";

const SavedNotes = () => {
  const notes = useSelector((state: RootState) => state.notesReducer);

  return (
    <div className="saved-notes-page-container">
      <h1>Saved Notes</h1>
      {Object.values(notes).map((note) => (
        <>
          <NoteCard key={note.id} noteFromRedux={note} />
        </>
      ))}
    </div>
  );
};

export default SavedNotes;
