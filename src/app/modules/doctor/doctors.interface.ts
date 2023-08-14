import { Model } from 'mongoose';
export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IDoctor = {
  _id: string;
  id: number;
  name: UserName;
  age?: number;
  email: string;
  password: string;
  phoneNumber: number;
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh';
  verifiedLicense: boolean;
  chamber: string;
  expertise: string;
  appointmentFee: number;
  //todo   appointments: Appointment[];
  //todo   clinics: Clinic[];
  //todo   Other doctor-specific properties
};

export type DoctorModel = Model<IDoctor, Record<string, unknown>>;

export type IDoctorFilters = {
  searchTerm?: string;
  location?: string;
  email?: string;
  phoneNumber?: string;
};
