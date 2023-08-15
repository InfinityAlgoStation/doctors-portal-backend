import { model } from 'mongoose';

import { Schema } from 'mongoose';
import { IPatient, PatientModel } from './patients.interface';

const patientSchema = new Schema<IPatient, PatientModel>(
  {
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Patient = model<IPatient, PatientModel>('Patient', patientSchema);
