import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessmentResponse extends Document {
  userId?: mongoose.Types.ObjectId;
  profileCode: string; // e.g. "IRC"
  topThree: string[];
  scores: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  dimensionPercentages: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  answers: Record<string, string>;
  createdAt: Date;
}

const AssessmentResponseSchema = new Schema<IAssessmentResponse>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    profileCode: {
      type: String,
      required: true,
      trim: true,
    },
    topThree: {
      type: [String],
      required: true,
    },
    scores: {
      R: { type: Number, default: 0 },
      I: { type: Number, default: 0 },
      A: { type: Number, default: 0 },
      S: { type: Number, default: 0 },
      E: { type: Number, default: 0 },
      C: { type: Number, default: 0 },
    },
    dimensionPercentages: {
      R: { type: Number, default: 0 },
      I: { type: Number, default: 0 },
      A: { type: Number, default: 0 },
      S: { type: Number, default: 0 },
      E: { type: Number, default: 0 },
      C: { type: Number, default: 0 },
    },
    answers: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const AssessmentResponse = mongoose.model<IAssessmentResponse>(
  'AssessmentResponse',
  AssessmentResponseSchema
);
