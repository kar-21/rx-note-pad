import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SortMenu from "../../molecules/SortMenu/SortMenu";
import { NotesType } from "../../store/Models/notes.interface";

import { RootState } from "../../store/Reducers";
import NewNoteCard from "../../templates/NewNoteCard/NewNoteCard";
import NoteCard from "../../templates/NoteCard/NoteCard";

const SavedNotes = () => {
  const notes = useSelector((state: RootState) => state.notesReducer);
  const [selectedSort, setSelectedSort] = useState("Modified-descending");

  const onSelectSortChange = (selectedSort: string) => {
    setSelectedSort(selectedSort);
  };

  const sortModified = (a: NotesType, b: NotesType, isDescending: boolean) => {
    if (
      new Date(a.dateOfModification).getTime() ===
      new Date(b.dateOfModification).getTime()
    )
      return 0;
    else if (
      isDescending &&
      new Date(a.dateOfModification).getTime() <
        new Date(b.dateOfModification).getTime()
    )
      return 1;
    else if (
      !isDescending &&
      new Date(a.dateOfModification).getTime() >
        new Date(b.dateOfModification).getTime()
    )
      return 1;
    return -1;
  };

  const sortCreate = (a: NotesType, b: NotesType, isDescending: boolean) => {
    if (
      new Date(a.dateOfCreation).getTime() ===
      new Date(b.dateOfCreation).getTime()
    )
      return 0;
    else if (
      isDescending &&
      new Date(a.dateOfCreation).getTime() <
        new Date(b.dateOfCreation).getTime()
    )
      return 1;
    else if (
      !isDescending &&
      new Date(a.dateOfCreation).getTime() >
        new Date(b.dateOfCreation).getTime()
    )
      return 1;
    return -1;
  };

  const sortBasedOnSelectedSort = useMemo(
    () => (a: NotesType, b: NotesType) => {
      switch (selectedSort) {
        case "Modified-descending":
          return sortModified(a, b, true);
        case "Modified-ascending":
          return sortModified(a, b, false);
        case "Created-descending":
          return sortCreate(a, b, true);
        case "Created-ascending":
          return sortCreate(a, b, false);
        default:
          return 0;
      }
    },
    [selectedSort]
  );

  const sortedNotes = useMemo(
    () => Object.values(notes).sort(sortBasedOnSelectedSort),
    [notes, sortBasedOnSelectedSort]
  );

  return (
    <div className="saved-notes-page-container">
      <h1>My Notes</h1>
      <SortMenu
        selectedSort={selectedSort}
        onSelectSortChange={onSelectSortChange}
      />
      <Box className="saved-notes-card-container">
        {sortedNotes.map((note) => (
          <NoteCard key={note.noteId} noteFromRedux={note} />
        ))}
        <NewNoteCard />
      </Box>
    </div>
  );
};

export default SavedNotes;
