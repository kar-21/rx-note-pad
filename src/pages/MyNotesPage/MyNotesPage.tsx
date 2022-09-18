import { Box } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import SortMenu from "../../molecules/SortMenu/SortMenu";

import { RootState } from "../../store/Reducers";
import NewNoteCard from "../../templates/NewNoteCard/NewNoteCard";
import NoteCard from "../../templates/NoteCard/NoteCard";

const SavedNotes = () => {
  const notes = useSelector((state: RootState) => state.notesReducer);
  const [selectedSort, setSelectedSort] = useState("Modified-descending");

  const onSelectSortChange = (selectedSort: string) => {
    setSelectedSort(selectedSort);
  };

  return (
    <div className="saved-notes-page-container">
      <h1>My Notes</h1>
      <SortMenu
        selectedSort={selectedSort}
        onSelectSortChange={onSelectSortChange}
      />
      <Box className="saved-notes-card-container">
        {Object.values(notes).map((note) => (
          <NoteCard key={note.noteId} noteFromRedux={note} />
        ))}
        <NewNoteCard />
      </Box>
    </div>
  );
};

export default SavedNotes;
