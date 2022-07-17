import { NotesReducerType } from "./../store/Models/notes.interface";
import { NotesResponseType } from "../store/Models/notes.interface";

export const NotesA2OTransformService = (
  notesArray: NotesResponseType[]
): NotesReducerType => {
  let notesObject = {};
  notesArray.forEach((note: NotesResponseType) => {
    if (typeof note.noteId === "string")
      notesObject = {
        ...notesObject,
        [note.noteId]: {
          id: note.noteId,
          title: note.title,
          content: note.content,
          color: note.color,
        },
      };
  });
  return notesObject;
};
