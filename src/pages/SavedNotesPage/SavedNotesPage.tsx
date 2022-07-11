import NoteCard from "../../templates/NoteCard/NoteCard";

const SavedNotes = () => {
  return (
    <div className="saved-notes-page-container">
      <h1>Saved Notes</h1>
      <NoteCard isNewCard />
    </div>
  );
};

export default SavedNotes;
