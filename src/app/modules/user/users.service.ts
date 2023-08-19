/* eslint-disable no-unused-vars */
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
    //set user email
    admin.email = user.email;
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin ');
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
    //set user email
    doctor.email = user.email;
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
  user.role = 'patient';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set user email
    patient.email = user.email;
    const newPatient = await Patient.create([patient], { session });

    if (!newPatient.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create patient ');
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

const getAllUsers = async (): Promise<IUser[]> => {
  const allUsers = await User.find({});
  if (!allUsers || allUsers.length === 0) {
    throw new ApiError(400, 'No Users found.');
  }
  return allUsers;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const getUserProfile = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.role === 'doctor') {
    await user.populate('doctor');
  } else if (user.role === 'patient') {
    await user.populate('patient');
  } else if (user.role === 'admin') {
    await user.populate('admin');
  }

  return user;
};

// const updateUserProfile = async (
//   id: string,
//   payload: Partial<IUser>
// ): Promise<IUser | null> => {
//   const isExist = await User.findOne({ _id: id });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
//   }

//   const { ...userData } = payload;

//   const updatedUserData: Partial<IUser> = { ...userData };

//   // dynamically handling
//   // if (name && Object.keys(name).length > 0) {
//   //   Object.keys(name).forEach(key => {
//   //     const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
//   //     (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
//   //   });
//   // }
//   const objectId = new Types.ObjectId(id); // Convert string to ObjectId
//   const result = await User.findOneAndUpdate(objectId, updatedUserData, {
//     new: true,
//   });
//   return result;
// };

// const updateUserProfile = async (
//   id: string,
//   payload: Partial<IUser>
// ): Promise<IUser | null> => {
//   // Check if the user exists
//   const user = await User.findById(id);

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
//   }

//   // Update user profile fields
//   const { role, ...userData } = payload;
//   user.set(userData);

//   // Update user role-specific fields
//   if (role === 'doctor') {
//     const doctorFields: Partial<IDoctor> = payload.doctor || {};
//     user.doctor?.set(doctorFields);
//   } else if (role === 'patient') {
//     const patientFields: Partial<IPatient> = payload.patient || {};
//     user.patient?.set(patientFields);
//   } else if (role === 'admin') {
//     const adminFields: Partial<IAdmin> = payload.admin || {};
//     user.admin?.set(adminFields);
//   }

//   // Save the updated user and return it
//   await user.save();
//   return user;
// };

const updateUserProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Retrieve user role
  const userRole = isExist.role;

  // Update the appropriate sub-document based on the role
  if (userRole === 'doctor' && payload.doctor) {
    await Doctor.updateOne({ _id: isExist.doctor }, { $set: payload.doctor });
  } else if (userRole === 'patient' && payload.patient) {
    await Patient.updateOne(
      { _id: isExist.patient },
      { $set: payload.patient }
    );
  } else if (userRole === 'admin' && payload.admin) {
    await Admin.updateOne({ _id: isExist.admin }, { $set: payload.admin });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid payload or role');
  }

  // Find and return the updated user
  const updatedUser = await User.findOne({ _id: id });

  return updatedUser;
};

export const UsersService = {
  createUser,
  createDoctor,
  createAdmin,
  createPatient,
  getAllUsers,
  getSingleUser,
  getUserProfile,
  updateUserProfile,
};
