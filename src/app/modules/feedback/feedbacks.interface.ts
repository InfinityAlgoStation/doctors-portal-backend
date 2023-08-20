import { Model, Types } from 'mongoose';
import { IDoctor } from '../doctor/doctors.interface';
import { IUser } from '../user/users.interface';

export type IFeedback = {
  patient: Types.ObjectId | IUser; // ID of the user providing the feedback
  doctor: Types.ObjectId | IDoctor; // ID of the doctor receiving the feedback
  feedback: string; // The actual feedback text
  createdAt: Date; // Timestamp of when the feedback was created
  updatedAt: Date; // Timestamp of when the feedback was last updated
};

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;
