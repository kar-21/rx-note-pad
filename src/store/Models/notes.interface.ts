export interface NotesType {
  noteId: string;
  title: string;
  content: string;
  color: string;
  dateOfCreation: Date,
  dateOfModification: Date,
  isSaved?: boolean;
}

export interface NotesReducerType {
  [key: string]: NotesType;
}

export interface NotesResponseType extends NotesType {
  userId: string;
}

export interface CreateNotePadType {
  id: string;
  isSaved: boolean;
}

export enum Color {
  white = "#F5F5F5",
  gray = "#A8A8A8",
  red = "#EDA6A6",
  green = "#A6EDA6",
  blue = "#A6A6ED",
}
