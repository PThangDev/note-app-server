import mongoose from 'mongoose';
import { UserDocument } from '../types';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    fullname: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatar: {
      type: String,
      trim: true,
      default:
        'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png',
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    type: {
      type: String,
      enum: ['register', 'google', 'facebook'],
      default: 'register',
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'banned'],
      default: 'pending',
    },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model<UserDocument>('user', userSchema);
