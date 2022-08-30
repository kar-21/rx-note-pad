import { Card, CardContent, IconButton, TextField, Box } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import { updateNote } from "../../store/ActionCreators/notes.actionCreators";
import { Color, NotesType } from "../../store/Models/notes.interface";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";
import { deleteNote, saveNote } from "../../store/Actions/notePad.action";
import { AnyAction } from "redux";
import {
  deleteLocalNote,
  saveLocalNote,
} from "../../store/Actions/localNotePad.action";

export interface NoteCardProp {
  noteFromRedux: NotesType;
}

const NoteCard = ({ noteFromRedux }: NoteCardProp) => {
  const dispatch = useDispatch();

  const [isColorPaletteOpened, setIsColorPaletteOpened] = useState(false);
  const [note, setNote] = useState<NotesType>(noteFromRedux);

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
    setIsColorPaletteOpened(false);
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

  const updateContentOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, content: value }));
      setNote((prev: NotesType) => ({ ...prev, content: value }));
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

  const handleDeleteNote = () => {
    if (userId) dispatch(deleteNote(userId, note.id) as unknown as AnyAction);
    else dispatch(deleteLocalNote(note.id) as unknown as AnyAction);
  };

  const debounceEventHandlerForTitle = useMemo(
    () => _.debounce(updateTitleOnChange, 500),
    [updateTitleOnChange]
  );

  const debounceEventHandlerForContent = useMemo(
    () => _.debounce(updateContentOnChange, 500),
    [updateContentOnChange]
  );

  const ColorPalettePicker = () => {
    return (
      <>
        {isColorPaletteOpened ? (
          <div className="color-palette-container">
            <IconButton
              className={`color-palette palette-1 ${
                note.color === Color.gray ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange(Color.gray);
              }}
            />
            <IconButton
              className={`color-palette palette-2 ${
                note.color === Color.red ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange(Color.red);
              }}
            />
            <IconButton
              className={`color-palette palette-3 ${
                note.color === Color.green ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange(Color.green);
              }}
            />
            <IconButton
              className={`color-palette palette-4 ${
                note.color === Color.blue ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange(Color.blue);
              }}
            />
            <IconButton
              className={`color-palette palette-5 ${
                note.color === Color.white ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange(Color.white);
              }}
            />
          </div>
        ) : (
          <IconButton onClick={() => setIsColorPaletteOpened(true)}>
            <ColorLensIcon />
          </IconButton>
        )}
      </>
    );
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
                <ColorPalettePicker />
                <IconButton onClick={handleDeleteNote}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
              <IconButton onClick={() => dispatch(setSelectedNoteId(""))}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className="card-container">
              <Box className="title-container">
                <TitleIcon className="title-icon" />
                <TextField
                  placeholder="Title"
                  variant="standard"
                  defaultValue={note.title}
                  inputProps={{ style: { fontSize: 30 } }}
                  InputLabelProps={{ style: { fontSize: 30 } }}
                  onChange={(e) =>
                    debounceEventHandlerForTitle(e.target.value, note)
                  }
                />
              </Box>
              <TextField
                placeholder="Content"
                variant="standard"
                multiline
                defaultValue={note.content}
                minRows={4}
                onChange={(e) =>
                  debounceEventHandlerForContent(e.target.value, note)
                }
              />
            </Box>
          </>
        ) : (
          <Box className="note-card-short-view">
            <Box className="short-view-container">
              <h1 className="no-margin">{note.title}</h1>
              <p className="no-margin">{note.content}</p>
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
