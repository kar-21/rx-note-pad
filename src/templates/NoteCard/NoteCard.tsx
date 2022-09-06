import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Box,
  Alert,
  InputAdornment,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import { updateNote } from "../../store/ActionCreators/notes.actionCreators";
import { NotesType } from "../../store/Models/notes.interface";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";
import { deleteNote, saveNote } from "../../store/Actions/notePad.action";
import { AnyAction } from "redux";
import {
  deleteLocalNote,
  saveLocalNote,
} from "../../store/Actions/localNotePad.action";
import ColorPalettePicker from "../../molecules/ColorPalettePicker/ColorPalettePicker";
import ContentTextField from "../../molecules/ContentTextField/ContentTextField";

export interface NoteCardProp {
  noteFromRedux: NotesType;
}

const NoteCard = ({ noteFromRedux }: NoteCardProp) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState<NotesType>(noteFromRedux);
  const [isAlertBoxOpen, setIsAlertBoxOpen] = useState(false);

  const { selectedNoteId } = useSelector(
    (state: RootState) => state.commonStateReducer
  );

  const { userId } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  const updateColorOnChange = (color: string) => {
    dispatch(updateNote({ ...note, color }));
    setNote((prev: NotesType) => ({ ...prev, color }));
    if (userId)
      dispatch(saveNote(userId, { ...note, color }) as unknown as AnyAction);
    else dispatch(saveLocalNote({ ...note, color }) as unknown as AnyAction);
  };

  const updateTitleOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, title: value }));
      setNote({ ...noteObject, title: value });
      if (userId)
        dispatch(
          saveNote(userId, {
            ...noteObject,
            title: value,
          }) as unknown as AnyAction
        );
      else
        dispatch(
          saveLocalNote({
            ...noteObject,
            title: value,
          }) as unknown as AnyAction
        );
    },
    [dispatch, userId]
  );

  const updateContentOnChange = (value: string) => {
    setNote((prev: NotesType) => ({ ...prev, content: value }));
  };

  const handleDeleteNote = () => {
    if (userId) dispatch(deleteNote(userId, note.id) as unknown as AnyAction);
    else dispatch(deleteLocalNote(note.id) as unknown as AnyAction);
  };

  const debounceEventHandlerForTitle = useMemo(
    () => _.debounce(updateTitleOnChange, 500),
    [updateTitleOnChange]
  );

  const handleShowAlertBox = () => {
    setIsAlertBoxOpen(true);
    setTimeout(() => {
      setIsAlertBoxOpen(false);
    }, 10000);
  };

  return (
    <Card
      className="note-card"
      style={{ backgroundColor: note.color }}
      sx={{ minWidth: selectedNoteId === note.id ? 300 : 5 }}
    >
      <CardContent>
        {selectedNoteId === note.id ? (
          <>
            <Box className="card-header">
              <Box className="card-header-left">
                <ColorPalettePicker
                  note={note}
                  onColorChange={updateColorOnChange}
                />
                <IconButton onClick={handleDeleteNote}>
                  <DeleteForeverIcon />
                </IconButton>
                {!userId && (
                  <IconButton onClick={handleShowAlertBox}>
                    <WarningAmberIcon />
                  </IconButton>
                )}
              </Box>
              <IconButton onClick={() => dispatch(setSelectedNoteId(""))}>
                <CloseIcon />
              </IconButton>
            </Box>
            {!userId && isAlertBoxOpen && (
              <Alert
                severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setIsAlertBoxOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                This Note is saved locally. Login / SignUp to save your work.
              </Alert>
            )}
            <Box className="card-container">
              <Box className="title-container">
                <TextField
                  className="title-field"
                  placeholder="Title"
                  variant="standard"
                  defaultValue={note.title}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon className="title-icon" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ style: { fontSize: 30 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}
                  onChange={(e) =>
                    debounceEventHandlerForTitle(e.target.value, note)
                  }
                />
              </Box>
              <ContentTextField
                note={note}
                onContentValueChange={updateContentOnChange}
              />
            </Box>
          </>
        ) : (
          <Box className="note-card-short-view">
            <Box className="short-view-container">
              {note.title ? (
                <h1 className="no-margin">{note.title}</h1>
              ) : (
                <h2 className="no-margin italic">[Empty]</h2>
              )}
              {note.content ? (
                <div
                  className="no-margin short-content"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                ></div>
              ) : (
                <p className="no-margin italic">[empty...]</p>
              )}
            </Box>
            <Box className="expand-icon-container">
              <IconButton
                className="expand-icon"
                onClick={() => {
                  dispatch(setSelectedNoteId(note.id));
                }}
              >
                <OpenInFullIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
