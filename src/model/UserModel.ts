// models/User.ts
import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  provider?: 'google' | 'credentials';
  role?: 'user' | 'admin';
  isVerified: boolean;
  verificationCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    provider: {
      type: String,
      enum: ['google', 'credentials'],
      default: 'credentials',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>('User', UserSchema);
export default User;
