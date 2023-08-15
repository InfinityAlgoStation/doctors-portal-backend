import { Model } from 'mongoose';

export type PatientName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
export type IPatient = {
  id: string;
  phoneNumber: number;
  email: string;
  password: string;
  name: PatientName;
};

export type PatientModel = Model<IPatient, Record<string, unknown>>;
