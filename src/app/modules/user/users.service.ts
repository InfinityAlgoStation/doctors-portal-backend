import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { IAdmin } from '../admin/admins.interface';
import { Admin } from '../admin/admins.model';
import { IDoctor } from '../doctor/doctors.interface';
import { Doctor } from '../doctor/doctors.model';
import { Patient } from '../patient/patients.model';
import { IPatient } from './../patient/patients.interface';
import { IUser } from './users.interface';
import { User } from './users.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('failed to create user !');
  }
  return createdUser;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findById({ _id: newUserAllData.id }).populate({
      path: 'admin',
    });
  }

  return newUserAllData;
};

const createDoctor = async (
  doctor: IDoctor,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'doctor';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newDoctor = await Doctor.create([doctor], { session });
    if (!newDoctor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create doctor');
    }
    //set doctor -> _id into user.doctor
    user.doctor = newDoctor[0];
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to created user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData.id }).populate({
      path: 'doctor',
    });
  }
  return newUserAllData;
};

const createPatient = async (
  patient: IPatient,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'admin';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newPatient = await Patient.create([patient], { session });

    if (!newPatient.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.patient = newPatient[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create patient');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData.id }).populate({
      path: 'patient',
    });
  }

  return newUserAllData;
};

export const UsersService = {
  createUser,
  createDoctor,
  createAdmin,
  createPatient,
};
