import { NotesType } from "../store/Models/notes.interface";

export const generateInitialNote = (id: string): NotesType => ({
  id,
  title: "",
  content: "",
  color: "#F5F5F5",
});
