import { Card, CardContent, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";

export interface NoteCardProp {
  isNewCard: boolean;
}

const NoteCard = ({ isNewCard }: NoteCardProp) => {
  const [backgroundColor, setBackgroundColor] = useState("#F5F5F5");
  const [clickedOnExpand, setClickedOnExpand] = useState(false);

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
                <h1>New Note</h1>
                <h3>Color</h3>
                <div className="color-palette-container">
                  <IconButton
                    className={`color-palette palette-1 ${
                      backgroundColor === "#A6A6A6"
                        ? "color-palette--selected"
                        : ""
                    }`}
                    onClick={() => setBackgroundColor("#A6A6A6")}
                  />
                  <IconButton
                    className={`color-palette palette-2 ${
                      backgroundColor === "#EDA6A6"
                        ? "color-palette--selected"
                        : ""
                    }`}
                    onClick={() => setBackgroundColor("#EDA6A6")}
                  />
                  <IconButton
                    className={`color-palette palette-3 ${
                      backgroundColor === "#A6EDA6"
                        ? "color-palette--selected"
                        : ""
                    }`}
                    onClick={() => setBackgroundColor("#A6EDA6")}
                  />
                  <IconButton
                    className={`color-palette palette-4 ${
                      backgroundColor === "#A6A6ED"
                        ? "color-palette--selected"
                        : ""
                    }`}
                    onClick={() => setBackgroundColor("#A6A6ED")}
                  />
                  <IconButton
                    className={`color-palette palette-5 ${
                      backgroundColor === "#F5F5F5"
                        ? "color-palette--selected"
                        : ""
                    }`}
                    onClick={() => setBackgroundColor("#F5F5F5")}
                  />
                </div>
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
