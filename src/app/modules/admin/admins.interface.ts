import { Model } from 'mongoose';

export type AdminName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
export type IAdmin = {
  id: string;
  phoneNumber: number;
  email: string;
  password: string;
  name: AdminName;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
