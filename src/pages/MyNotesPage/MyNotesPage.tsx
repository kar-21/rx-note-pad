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

  const sortNotes = (
    firstNote: NotesType,
    secondNote: NotesType,
    sortType: string,
    isDescending: boolean
  ) => {
    const firstNoteDate =
      sortType === "Modified"
        ? firstNote.dateOfModification
        : firstNote.dateOfCreation;
    const secondNoteDate =
      sortType === "Modified"
        ? secondNote.dateOfModification
        : secondNote.dateOfCreation;
    if (
      new Date(firstNoteDate).getTime() === new Date(secondNoteDate).getTime()
    )
      return 0;
    else if (
      isDescending &&
      new Date(firstNoteDate).getTime() < new Date(secondNoteDate).getTime()
    )
      return 1;
    else if (
      !isDescending &&
      new Date(firstNoteDate).getTime() > new Date(secondNoteDate).getTime()
    )
      return 1;
    return -1;
  };

  const sortBasedOnSelectedSort = useMemo(
    () => (a: NotesType, b: NotesType) => {
      switch (selectedSort) {
        case "Modified-descending":
          return sortNotes(a, b, 'Modified', true);
        case "Modified-ascending":
          return sortNotes(a, b, 'Modified', false);
        case "Created-descending":
          return sortNotes(a, b, 'Created', true);
        case "Created-ascending":
          return sortNotes(a, b, 'Created', false);
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
