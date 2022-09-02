import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import { Color, NotesType } from "../../store/Models/notes.interface";

interface ColorPalettePickerProp {
  note: NotesType;
  onColorChange: (value: string) => void;
}

const ColorPalettePicker = ({ note, onColorChange }: ColorPalettePickerProp) => {


  const [isColorPaletteOpened, setIsColorPaletteOpened] = useState(false);

  const updateColorOnChange = (color: string) => {
    onColorChange(color);
    setIsColorPaletteOpened(false);
  };

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

export default ColorPalettePicker;
