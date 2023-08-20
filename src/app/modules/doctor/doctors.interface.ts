import { Model } from 'mongoose';
export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IDoctor = {
  _id: string;
  id: string;
  name: UserName;
  age: number | null;
  email: string;
  phoneNumber: string;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh'
    | null;
  verifiedLicense: boolean | null;
  gender: 'male' | 'female' | null;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | null;
  chamber: string | null;
  expertise: string[] | null;
  appointmentFee: number | null;
  profileImage?: string;
};

export type DoctorModel = Model<IDoctor, Record<string, unknown>>;

export type IDoctorFilters = {
  searchTerm?: string;
  location?: string;
  email?: string;
  phoneNumber?: string;
};
