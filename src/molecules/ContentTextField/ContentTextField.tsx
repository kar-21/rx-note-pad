import React, { useCallback, useMemo } from "react";
import { TextField } from "@mui/material";
import { NotesType } from "../../store/Models/notes.interface";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AnyAction } from "redux";
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
      onContentValueChange(value);
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
    [dispatch, onContentValueChange, userId]
  );

  const debounceEventHandlerForContent = useMemo(
    () => _.debounce(updateContentOnChange, 500),
    [updateContentOnChange]
  );
  return (
    <TextField
      placeholder="Content"
      variant="standard"
      multiline
      defaultValue={note.content}
      minRows={4}
      onChange={(e) => debounceEventHandlerForContent(e.target.value, note)}
    />
  );
};

export default ContentTextField;
