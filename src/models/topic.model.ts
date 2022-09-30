import mongoose from 'mongoose';

import { TopicDocument } from '../types';

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
      unique: false,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'note' }],
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

topicSchema.index({ name: 'text' }, { default_language: 'none' });

export default mongoose.model<TopicDocument>('topic', topicSchema);
