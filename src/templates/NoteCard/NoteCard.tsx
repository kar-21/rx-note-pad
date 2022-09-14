import React, { useCallback, useMemo, useState, useEffect } from "react";
import { AnyAction } from "redux";
import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import { updateNote } from "../../store/ActionCreators/notes.actionCreators";
import { NotesType } from "../../store/Models/notes.interface";
import {
  setAlert,
  setSelectedNoteId,
} from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";
import {
  deleteNote,
  saveLocalNoteToRemote,
  saveNote,
} from "../../store/Actions/notePad.action";
import {
  deleteLocalNote,
  saveLocalNote,
} from "../../store/Actions/localNotePad.action";
import ColorPalettePicker from "../../molecules/ColorPalettePicker/ColorPalettePicker";
import ContentTextField from "../../molecules/ContentTextField/ContentTextField";
import { AlertLevel } from "../../store/Models/commonState.interface";

export interface NoteCardProp {
  noteFromRedux: NotesType;
}

const NoteCard = ({ noteFromRedux }: NoteCardProp) => {
  const dispatch = useDispatch();

  const [note, setNote] = useState<NotesType>(noteFromRedux);

  const { selectedNoteId } = useSelector(
    (state: RootState) => state.commonStateReducer
  );

  const { userId } = useSelector(
    (state: RootState) => state.userDetailsReducer
  );

  useEffect(() => {
    setNote(noteFromRedux);
  }, [noteFromRedux]);

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
    if (note.isSaved)
      dispatch(deleteNote(userId, note.noteId) as unknown as AnyAction);
    else dispatch(deleteLocalNote(note.noteId) as unknown as AnyAction);
  };

  const debounceEventHandlerForTitle = useMemo(
    () => _.debounce(updateTitleOnChange, 500),
    [updateTitleOnChange]
  );

  const handleShowAlertBox = () => {
    dispatch(
      setAlert({
        message:
          "This Note is saved locally. Login / SignUp to save your work.",
        level: AlertLevel.warning,
      })
    );
  };

  const handleSaveLocalNote = () => {
    dispatch(saveLocalNoteToRemote(userId, note) as unknown as AnyAction);
  };

  return (
    <Card
      className="note-card"
      style={{ backgroundColor: note.color }}
      sx={{ minWidth: selectedNoteId === note.noteId ? 300 : 5 }}
    >
      <CardContent>
        {selectedNoteId === note.noteId ? (
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
                {!note.isSaved && (
                  <>
                    <IconButton onClick={handleShowAlertBox}>
                      <WarningAmberIcon />
                    </IconButton>
                    {userId && (
                      <IconButton onClick={handleSaveLocalNote}>
                        <SaveIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Box>
              <IconButton onClick={() => dispatch(setSelectedNoteId(""))}>
                <CloseIcon />
              </IconButton>
            </Box>
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
                  dispatch(setSelectedNoteId(note.noteId));
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
