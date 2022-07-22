import React from "react";
import { v4 as uuidV4 } from "uuid";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";
import { createNewNote } from "../../store/Actions/notePad.action";
import { AnyAction } from "redux";

const NewNoteCard = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const createNote = () => {
    const noteId = uuidV4();
    dispatch(createNewNote(userId, noteId) as unknown as AnyAction);
    dispatch(setSelectedNoteId(noteId));
  };

  return (
    <>
      <IconButton onClick={createNote}>
        <AddCircleIcon fontSize="large" className="add-icon" />
      </IconButton>
    </>
  );
};

export default NewNoteCard;
