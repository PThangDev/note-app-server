export interface Topic {
  _id: string;
  user: string;
  thumnail: string;
}

export interface TopicDocument extends Topic, Document {
  _doc: object;
}
