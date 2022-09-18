import mongoose from 'mongoose';
import { Note } from '../types/Note';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topic' }],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: { type: String, trim: true, default: '' },
    background: { type: String, trim: true, default: '' },
    slug: {
      type: String,
      required: true,
      // unique: true,
    },
    is_trash: { type: Boolean, default: false },
    is_pin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteSchema.index({ title: 'text', content: 'text' }, { default_language: 'none' });

export default mongoose.model<Note>('note', noteSchema);
