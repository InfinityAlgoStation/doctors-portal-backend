import { Model } from 'mongoose';

export type PatientName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
export type IPatient = {
  _id: string;
  id: string;
  phoneNumber: string;
  email: string;
  name: PatientName;
  gender: 'male' | 'female' | null;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | null;
  profileImage?: string;
};

export type PatientModel = Model<IPatient, Record<string, unknown>>;
