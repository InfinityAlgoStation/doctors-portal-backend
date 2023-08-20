import { Schema, model } from 'mongoose';
import { FeedbackModel, IFeedback } from './feedbacks.interface';

const feedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  feedbackSchema
);
