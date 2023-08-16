import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admins.interface';
import { IDoctor } from '../doctor/doctors.interface';
import { IPatient } from '../patient/patients.interface';

export type IUser = {
  _id: string;
  role: string;
  doctor?: Types.ObjectId | IDoctor;
  patient?: Types.ObjectId | IPatient;
  admin?: Types.ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
