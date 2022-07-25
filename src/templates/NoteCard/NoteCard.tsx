import { Card, CardContent, IconButton, TextField, Box } from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import { updateNote } from "../../store/ActionCreators/notes.actionCreators";
import { NotesType } from "../../store/Models/notes.interface";
import { setSelectedNoteId } from "../../store/ActionCreators/commonState.actionCreators";
import { RootState } from "../../store/Reducers";
import { saveNote } from "../../store/Actions/notePad.action";
import { AnyAction } from "redux";

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
    dispatch(saveNote(userId, { ...note, color }) as unknown as AnyAction);
    setIsColorPaletteOpened(false);
  };

  const updateTitleOnChange = useCallback(
    (value: string, noteObject: NotesType) => {
      dispatch(updateNote({ ...noteObject, title: value }));
      setNote({ ...noteObject, title: value });
      dispatch(
        saveNote(userId, {
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
      dispatch(
        saveNote(userId, {
          ...noteObject,
          content: value,
        }) as unknown as AnyAction
      );
    },
    [dispatch, userId]
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
