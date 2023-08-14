import { Schema, model } from 'mongoose';
import { DoctorModel, IDoctor } from './doctors.interface';

const doctorSchema = new Schema<IDoctor, DoctorModel>(
  {
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
    id: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      enum: [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      required: true,
    },
    verifiedLicense: {
      type: Boolean,
      default: false,
      required: true,
    },
    chamber: {
      type: String,
      required: true,
    },
    expertise: [
      {
        type: String,
        required: true,
      },
    ],

    appointmentFee: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = model<IDoctor, DoctorModel>('Doctor', doctorSchema);
