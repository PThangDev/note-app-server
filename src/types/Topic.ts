import { Note } from './Note';

export interface Topic {
  _id: string;
  name: string;
  description: string;
  user: string;
  notes: Note[];
  background: string;
}

export interface TopicDocument extends Topic, Document {
  _doc: Topic;
}

export type TopicUpdate = Partial<Omit<Topic, '_id' | 'user'>>;
