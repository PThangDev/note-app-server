import mongoose from 'mongoose';

import { TopicDocument } from '../types';

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
      unique: false,
    },
    background: {
      type: String,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note' }],
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<TopicDocument>('topic', topicSchema);
