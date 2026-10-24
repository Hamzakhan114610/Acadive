import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  educationStage: string;
  targetCareerId?: string;
  role: 'student' | 'mentor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    educationStage: {
      type: String,
      enum: [
        'matric_science',
        'matric_computer',
        'matric_arts',
        'fsc_pre_eng',
        'fsc_pre_med',
        'ics',
        'icom',
        'dae',
        'o_level',
        'a_level',
        'undergrad',
      ],
      default: 'fsc_pre_eng',
    },
    targetCareerId: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);
