import {
  Card,
  CardContent,
  IconButton,
  TextField,
  Box,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../store/ActionCreators/notes.actionCreators";

export interface NoteCardProp {
  isNewCard: boolean;
}

const NoteCard = ({ isNewCard }: NoteCardProp) => {
  const dispatch = useDispatch();

  const [backgroundColor, setBackgroundColor] = useState("#F5F5F5");
  const [clickedOnExpand, setClickedOnExpand] = useState(false);
  const [isColorPaletteOpened, setIsColorPaletteOpened] = useState(false);

  const createNewNote = () => {
    dispatch(createNote("1234"));
    setClickedOnExpand(true);
  };

  const ColorPalettePicker = () => {
    return (
      <>
        {isColorPaletteOpened ? (
          <div className="color-palette-container">
            <IconButton
              className={`color-palette palette-1 ${
                backgroundColor === "#A8A8A8" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                setBackgroundColor("#A8A8A8");
                setIsColorPaletteOpened(false);
              }}
            />
            <IconButton
              className={`color-palette palette-2 ${
                backgroundColor === "#EDA6A6" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                setBackgroundColor("#EDA6A6");
                setIsColorPaletteOpened(false);
              }}
            />
            <IconButton
              className={`color-palette palette-3 ${
                backgroundColor === "#A6EDA6" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                setBackgroundColor("#A6EDA6");
                setIsColorPaletteOpened(false);
              }}
            />
            <IconButton
              className={`color-palette palette-4 ${
                backgroundColor === "#A6A6ED" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                setBackgroundColor("#A6A6ED");
                setIsColorPaletteOpened(false);
              }}
            />
            <IconButton
              className={`color-palette palette-5 ${
                backgroundColor === "#F5F5F5" ? "color-palette--selected" : ""
              }`}
              onClick={() => {
                setBackgroundColor("#F5F5F5");
                setIsColorPaletteOpened(false);
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
      style={{ backgroundColor: backgroundColor }}
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
                    />
                  </Box>
                  <TextField
                    placeholder="Content"
                    variant="standard"
                    multiline
                    minRows={4}
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
