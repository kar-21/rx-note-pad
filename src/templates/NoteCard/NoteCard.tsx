import { Card, CardContent, IconButton, TextField, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import {
  createNote,
  updateNote,
} from "../../store/ActionCreators/notes.actionCreators";
import { NotesType } from "../../store/Models/notes.interface";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";

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

  const createNewNote = () => {
    dispatch(createNote(note.id));
    dispatch(setSelectedNoteId(note.id));
  };

  const updateColorOnChange = (color: string) => {
    dispatch(updateNote({ ...note, color }));
    setNote((prev: NotesType) => ({ ...prev, color }));
    setIsColorPaletteOpened(false);
  };

  const updateTitleOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, title: value }));
      setNote({ ...noteObject, title: value });
    },
    [dispatch]
  );

  const updateContentOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, content: value }));
      setNote((prev: NotesType) => ({ ...prev, content: value }));
    },
    [dispatch]
  );

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
                note.color === "#A8A8A8" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange("#A8A8A8");
              }}
            />
            <IconButton
              className={`color-palette palette-2 ${
                note.color === "#EDA6A6" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange("#EDA6A6");
              }}
            />
            <IconButton
              className={`color-palette palette-3 ${
                note.color === "#A6EDA6" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange("#A6EDA6");
              }}
            />
            <IconButton
              className={`color-palette palette-4 ${
                note.color === "#A6A6ED" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange("#A6A6ED");
              }}
            />
            <IconButton
              className={`color-palette palette-5 ${
                note.color === "#F5F5F5" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                updateColorOnChange("#F5F5F5");
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
            {selectedNoteId === note.id ? (
              <>
                <Box className="card-header">
                  <ColorPalettePicker />
                  <IconButton
                    onClick={() => {
                      dispatch(setSelectedNoteId(""));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className="card-container">
                  <Box className="title-container">
                    <TitleIcon className="title-icon" />
                    <TextField
                      placeholder="Title"
                      variant="standard"
                      value={note.title}
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
                    value={note.content}
                    minRows={4}
                    onChange={(e) =>
                      debounceEventHandlerForContent(e.target.value, note)
                    }
                  />
                </Box>
              </>
            ) : (
              <IconButton onClick={createNewNote}>
                <AddCircleIcon fontSize="large" className="add-icon" />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
