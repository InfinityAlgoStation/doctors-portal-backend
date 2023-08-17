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
    email: {
      type: String,
      required: true,
      unique: true,
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
        null,
      ],
      default: null,
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
    verifiedLicense: {
      type: Boolean,
      default: null,
    },
    chamber: {
      type: String,
      default: null,
    },
    expertise: {
      type: [String], // Assuming you're using an array for expertise
      default: null,
    },
    appointmentFee: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor = model<IDoctor, DoctorModel>('Doctor', doctorSchema);
