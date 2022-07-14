import { Card, CardContent, IconButton, TextField, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import * as _ from "lodash";

import {
  createNote,
  updateNote,
} from "../../store/ActionCreators/notes.actionCreators";
import { NotesType } from "../../store/Models/notes.interface";
import { generateInitialNote } from "../../services/GenerateInitialNote.service";

export interface NoteCardProp {
  isNewCard: boolean;
  noteId?: string;
  noteFromRedux?: NotesType;
}

const NoteCard = ({ isNewCard, noteId, noteFromRedux }: NoteCardProp) => {
  const dispatch = useDispatch();

  const [clickedOnExpand, setClickedOnExpand] = useState(false);
  const [isColorPaletteOpened, setIsColorPaletteOpened] = useState(false);
  const [note, setNote] = useState<NotesType>(
    noteId && noteFromRedux ? noteFromRedux : generateInitialNote(uuidV4())
  );

  const createNewNote = () => {
    dispatch(createNote(note.id));
    setClickedOnExpand(true);
  };

  const updateColorOnChange = (color: string) => {
    dispatch(updateNote({ ...note, color }));
    setNote((prev: NotesType) => ({ ...prev, color }));
    setIsColorPaletteOpened(false);
  };

  const updateTitleOnChange = (value: string, noteObject: NotesType) => {
    dispatch(updateNote({ ...noteObject, title: value }));
    setNote({ ...noteObject, title: value });
  };

  const updateContentOnChange = (value: string, noteObject: NotesType) => {
    dispatch(updateNote({ ...noteObject, content: value }));
    setNote((prev: NotesType) => ({ ...prev, content: value }));
  };

  const debounceEventHandlerForTitle = useMemo(
    () => _.debounce(updateTitleOnChange, 500),
    []
  );

  const debounceEventHandlerForContent = useMemo(
    () => _.debounce(updateContentOnChange, 500),
    []
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
      sx={{ minWidth: clickedOnExpand ? 300 : 5 }}
    >
      <CardContent>
        {isNewCard ? (
          <>
            {clickedOnExpand ? (
              <>
                <Box className="card-header">
                  <ColorPalettePicker />
                  <IconButton onClick={() => setClickedOnExpand(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box className="card-container">
                  <Box className="title-container">
                    <TitleIcon className="title-icon" />
                    <TextField
                      placeholder="Title"
                      variant="standard"
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
          <h1>Card Name</h1>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
