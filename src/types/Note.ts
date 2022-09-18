import { BaseParams, Topic, User } from '.';

export interface Note {
  _id: string;
  user: string;
  topics: Topic[] | null;
  thumbnail: string;
  background: string;
  title: string;
  content: string;
  is_pin: boolean;
  is_trash: boolean;
}

export interface NoteDocument extends Note, Document {
  _doc: Note;
}

export type NoteCreate = Omit<Note, '_id' | 'is_pin' | 'is_trash' | 'user'>;

export type NoteUpdate = {
  [Property in keyof Omit<Note, '_id' | 'user'>]?: Note[Property];
} & { slug?: string };
