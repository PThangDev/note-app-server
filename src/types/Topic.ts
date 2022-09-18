import { Note } from './Note';

export interface Topic {
  _id: string;
  name: string;
  user: string;
  notes: Note[];
  background: string;
}

export interface TopicDocument extends Topic, Document {
  _doc: Topic;
}

export type TopicUpdate = {
  [Property in keyof Omit<Topic, '_id'>]?: Topic[Property];
};
