import mongoose from 'mongoose';
import { ITopic } from '../types';

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
      ref: 'users',
      unique: false,
    },
    background: {
      type: String,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }],
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ITopic>('topics', topicSchema);
