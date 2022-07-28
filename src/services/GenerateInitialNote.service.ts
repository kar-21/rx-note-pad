import { Color, NotesType } from "../store/Models/notes.interface";

export const generateInitialNote = (id: string): NotesType => ({
  id,
  title: "",
  content: "",
  color: Object.values(Color)[Math.floor(Math.random() * 5)],
});
