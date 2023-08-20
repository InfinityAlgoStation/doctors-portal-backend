import { model } from 'mongoose';

import { Schema } from 'mongoose';
import { IPatient, PatientModel } from './patients.interface';

const patientSchema = new Schema<IPatient, PatientModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    gender: {
      type: String,
      enum: ['male', 'female', null],
      default: null,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', null],
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
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
