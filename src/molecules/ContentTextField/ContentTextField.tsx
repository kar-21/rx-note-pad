import React, { useCallback, useMemo, useState } from "react";
import { Box, Divider, Grid, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AnyAction } from "redux";
import FormatBoldIcon from "@mui/icons-material/FormatBold";

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

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

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

  const handleOnSelect = (event: any) => {
    setSelectionStart(event.target.selectionStart);
    setSelectionEnd(event.target.selectionEnd);
  };

  const handleBoldChange = () => {
    if (selectionStart !== selectionEnd) {
      const beforeString = note.content.substring(0, selectionStart);
      const afterString = note.content.substring(selectionEnd);
      const selectedString = note.content.substring(
        selectionStart,
        selectionEnd
      );
      console.log(
        ">>>>",
        `${beforeString}<b>${selectedString}</b>${afterString}`
      );
      handleOnContentValueChange(
        `${beforeString}<b>${selectedString}</b>${afterString}`
      );
    }
  };

  return (
    <>
      <Divider />
      <Box>
        Style{" "}
        <IconButton onClick={handleBoldChange}>
          <FormatBoldIcon />
        </IconButton>
      </Box>
      <Divider />
      <Grid container className="content-field-container">
        <Grid item className="content-field-text">
          Text:
          <TextField
            placeholder="Content"
            variant="outlined"
            multiline
            value={note.content}
            minRows={4}
            onChange={(e) => handleOnContentValueChange(e.target.value)}
            onSelect={handleOnSelect}
          />
        </Grid>
        <Grid item className="content-field-visual">
          Visual:
          <div
            id="editor"
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
          ></div>
        </Grid>
      </Grid>
    </>
  );
};

export default ContentTextField;
