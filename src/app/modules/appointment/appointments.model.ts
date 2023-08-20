import { Schema, model } from 'mongoose';
import { AppointmentModel, IAppointment } from './appointments.interface';

const appointmentSchema = new Schema<IAppointment, AppointmentModel>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    appointmentDate: { type: Date, required: true },
    problemTitle: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Appointment = model<IAppointment, AppointmentModel>(
  'Appointment',
  appointmentSchema
);
