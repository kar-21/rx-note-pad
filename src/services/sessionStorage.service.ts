import { NotesType } from "../store/Models/notes.interface";

const sessionStore = ((sessionStorage: {
  setItem: (arg0: string, arg1: string) => void;
  getItem: (arg0: string) => void;
}) => {
  const setNoteInSession = (note: NotesType) => {
    sessionStorage.setItem(`note:${note.id}`, JSON.stringify(note));
  };

  const getNoteInSession = (noteId: string) => {
    sessionStorage.getItem(`note:${noteId}`);
  };

  return {
    getLocalNote: (key: string) => getNoteInSession(key),
    setLocalNote: (key: NotesType) => setNoteInSession(key),
  };
})(sessionStorage);

export default sessionStore;
