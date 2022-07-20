import React from "react";
import { v4 as uuidV4 } from "uuid";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useDispatch } from "react-redux";
import { createNote } from "../../store/ActionCreators/notes.actionCreators";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";

const NewNoteCard = () => {
  const dispatch = useDispatch();

  const createNewNote = () => {
    const noteId = uuidV4();
    dispatch(createNote(noteId));
    dispatch(setSelectedNoteId(noteId));
  };
  return (
    <>
      <IconButton onClick={createNewNote}>
        <AddCircleIcon fontSize="large" className="add-icon" />
      </IconButton>
    </>
  );
};

export default NewNoteCard;
