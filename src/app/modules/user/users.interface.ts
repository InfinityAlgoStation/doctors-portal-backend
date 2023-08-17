/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admins.interface';
import { IDoctor } from '../doctor/doctors.interface';
import { IPatient } from '../patient/patients.interface';

export type IUser = {
  id: string;
  email: string;
  password: string;
  role: string;
  doctor?: Types.ObjectId | IDoctor;
  patient?: Types.ObjectId | IPatient;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'email'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

//export type UserModel = Model<IUser, Record<string, unknown>>;
