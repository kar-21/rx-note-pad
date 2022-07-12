import { Card, CardContent, IconButton, TextField, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TitleIcon from "@mui/icons-material/Title";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export interface NoteCardProp {
  isNewCard: boolean;
}

const NoteCard = ({ isNewCard }: NoteCardProp) => {
  const [backgroundColor, setBackgroundColor] = useState("#F5F5F5");
  const [clickedOnExpand, setClickedOnExpand] = useState(false);
  const [isColorPaletteOpened, setIsColorPaletteOpened] = useState(false);

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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  {isColorPaletteOpened ? (
                    <div className="color-palette-container">
                      <IconButton
                        className={`color-palette palette-1 ${
                          backgroundColor === "#A6A6A6"
                            ? "color-palette--selected"
                            : ""
                        }`}
                        onClick={() => {
                          setBackgroundColor("#A6A6A6");
                          setIsColorPaletteOpened(false);
                        }}
                      />
                      <IconButton
                        className={`color-palette palette-2 ${
                          backgroundColor === "#EDA6A6"
                            ? "color-palette--selected"
                            : ""
                        }`}
                        onClick={() => {
                          setBackgroundColor("#EDA6A6");
                          setIsColorPaletteOpened(false);
                        }}
                      />
                      <IconButton
                        className={`color-palette palette-3 ${
                          backgroundColor === "#A6EDA6"
                            ? "color-palette--selected"
                            : ""
                        }`}
                        onClick={() => {
                          setBackgroundColor("#A6EDA6");
                          setIsColorPaletteOpened(false);
                        }}
                      />
                      <IconButton
                        className={`color-palette palette-4 ${
                          backgroundColor === "#A6A6ED"
                            ? "color-palette--selected"
                            : ""
                        }`}
                        onClick={() => {
                          setBackgroundColor("#A6A6ED");
                          setIsColorPaletteOpened(false);
                        }}
                      />
                      <IconButton
                        className={`color-palette palette-5 ${
                          backgroundColor === "#F5F5F5"
                            ? "color-palette--selected"
                            : ""
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
                  <IconButton onClick={() => setClickedOnExpand(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TitleIcon
                    sx={{
                      color: "action.active",
                      mr: 1,
                      my: 0.5,
                      fontSize: 40,
                    }}
                  />
                  <TextField
                    placeholder="Title"
                    variant="standard"
                    inputProps={{ style: { fontSize: 30 } }}
                    InputLabelProps={{ style: { fontSize: 30 } }}
                    focused
                  />
                </Box>
              </>
            ) : (
              <IconButton onClick={() => setClickedOnExpand(true)}>
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