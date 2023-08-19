import { Model, Types } from 'mongoose';
import { IDoctor } from '../doctor/doctors.interface';
import { IPatient } from '../patient/patients.interface';

export type IAppointment = {
  id: string;
  patient: Types.ObjectId | IPatient; // ID of the patient making the appointment
  doctor: Types.ObjectId | IDoctor; // ID of the doctor the patient is scheduling with
  gender: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  appointmentDate: Date; // Date and time of the appointment
  problemTitle: string;
  description: string; // Reason for the appointment
  status: 'pending' | 'confirmed' | 'cancelled'; // Appointment status
};

export type AppointmentModel = Model<IAppointment, Record<string, unknown>>;
