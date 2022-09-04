import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { AnyAction } from "redux";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
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

  const [formats, setFormats] = useState<string[]>([]);

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [isEditView, setIsEditView] = useState(false);

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

  const handleFontChange = (fontType: string) => {
    let fontIdentifiers = ["", ""];
    if (fontType === "bold") fontIdentifiers = ["<b>", "</b>"];
    if (fontType === "italic") fontIdentifiers = ["<i>", "</i>"];
    if (fontType === "underlined") fontIdentifiers = ["<u>", "</u>"];
    if (selectionStart !== selectionEnd) {
      const beforeString = note.content.substring(0, selectionStart);
      const afterString = note.content.substring(selectionEnd);
      const selectedString = note.content.substring(
        selectionStart,
        selectionEnd
      );
      handleOnContentValueChange(
        `${beforeString}${fontIdentifiers[0]}${selectedString}${fontIdentifiers[1]}${afterString}`
      );
    }
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    if (newFormats.includes("bold")) handleFontChange("bold");
    if (newFormats.includes("italic")) handleFontChange("italic");
    if (newFormats.includes("underlined")) handleFontChange("underlined");
  };

  const toggleEdit = () => {
    setIsEditView((prev) => !prev);
  };

  return (
    <Box className="content-container">
      <Divider />
      {isEditView ? (
        <>
          <Box className="style-container">
            <b>Style </b>
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
              size="small"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Divider />
          <Grid container className="content-field-container">
            <Grid item className="content-field-text">
              <b>Text:</b>
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
              <b>Visual:</b>
              <div
                id="editor"
                dangerouslySetInnerHTML={{
                  __html: note.content,
                }}
              ></div>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid item className="content-field">
          <div
            id="editor"
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
          ></div>
        </Grid>
      )}
      <Button
        variant="outlined"
        onClick={toggleEdit}
        color="inherit"
        size="small"
        className="content-button"
        startIcon={isEditView ? <VisibilityIcon /> : <EditIcon />}
      >
        {isEditView ? "Visual" : "Edit"}
      </Button>
    </Box>
  );
};

export default ContentTextField;
