import React, { useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AnyAction } from "redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { NotesType } from "../../store/Models/notes.interface";
import { updateNote } from "../../store/ActionCreators/notes.actionCreators";
import { saveLocalNote } from "../../store/Actions/localNotePad.action";
import { saveNote } from "../../store/Actions/notePad.action";
import { RootState } from "../../store/Reducers";

interface ContentTextFieldProp {
  note: NotesType;
  onContentValueChange: (value: string) => void;
}

const ContentTextField = ({
  note,
  onContentValueChange,
}: ContentTextFieldProp) => {
  const dispatch = useDispatch();

  const { userId } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const updateContentOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, content: value }));
      if (userId)
        dispatch(
          saveNote(userId, {
            ...noteObject,
            content: value,
          }) as unknown as AnyAction
        );
      else
        dispatch(
          saveLocalNote({
            ...noteObject,
            content: value,
          }) as unknown as AnyAction
        );
    },
    [dispatch, userId]
  );

  const debounceEventHandlerForContent = useMemo(
    () => _.debounce(updateContentOnChange, 500),
    [updateContentOnChange]
  );

  const handleOnContentValueChange = (value: string) => {
    onContentValueChange(value);
    debounceEventHandlerForContent(value, note);
  };

  return (
    <Box className="content-container">
      <ReactQuill
        theme="snow"
        value={note.content}
        onChange={handleOnContentValueChange}
      />
    </Box>
  );
};

export default ContentTextField;
