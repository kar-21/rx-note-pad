export interface NotesType {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface NotesReducerType {
  [key: string]: NotesType;
}
