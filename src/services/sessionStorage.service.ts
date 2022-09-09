import { NotesReducerType, NotesType } from "../store/Models/notes.interface";

const sessionStore = ((sessionStorage: {
  setItem: (arg0: string, arg1: string) => void;
  getItem: (arg0: string) => string | null;
  removeItem: (arg0: string) => void;
}) => {
  const setNoteInSession = (note: NotesType) => {
    sessionStorage.setItem(`note:${note.noteId}`, JSON.stringify(note));
  };

  const getNoteInSession = (noteId: string) => {
    sessionStorage.getItem(`note:${noteId}`);
  };

  const removeNoteSession = (noteId: string) => {
    sessionStorage.removeItem(`note:${noteId}`);
  };

  const getAllLocalNotes = () => {
    const noteObject = Object.keys(sessionStorage).reduce(
      (noteObject: NotesReducerType, key: string) => {
        if (key.includes("note:")) {
          const noteId = key.split(":")[1];
          const noteString = sessionStorage.getItem(key)
          noteObject[noteId] = noteString && JSON.parse(noteString);
        }
        return noteObject;
      },
      {}
    );
    return noteObject;
  };

  return {
    getLocalNote: (key: string) => getNoteInSession(key),
    setLocalNote: (key: NotesType) => setNoteInSession(key),
    removeLocalNote: (key: string) => removeNoteSession(key),
    getAllLocalNote: () => getAllLocalNotes(),
  };
})(sessionStorage);

export default sessionStore;
