import { Color, NotesType } from "../store/Models/notes.interface";

export const generateInitialNote = (
  noteId: string,
  isSaved: boolean
): NotesType => ({
  noteId,
  title: "",
  content: "",
  color: Object.values(Color)[Math.floor(Math.random() * 5)],
  dateOfCreation: new Date(Date.now()),
  dateOfModification: new Date(Date.now()),
  isSaved,
});
