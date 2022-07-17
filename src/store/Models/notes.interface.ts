export interface NotesType {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface NotesReducerType {
  [key: string]: NotesType;
}

export interface NotesResponseType {
  userId: String;
  noteId: String;
  title: String;
  content: String;
  color: String;
}
