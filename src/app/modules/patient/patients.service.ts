import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/users.model';
import { IPatient } from './patients.interface';
import { Patient } from './patients.model';

const createPatient = async (patient: IPatient): Promise<IPatient | null> => {
  const createdPatient = await Patient.create(patient);
  if (!createdPatient) {
    throw new ApiError(400, 'failed to create Patient !');
  }
  return createdPatient;
};

const getAllPatients = async (): Promise<IPatient[]> => {
  const allPatients = await Patient.find({});
  if (!allPatients || allPatients.length === 0) {
    throw new ApiError(400, 'No Patients found.');
  }
  return allPatients;
};

const getSinglePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findById(id);
  return result;
};

const updatePatient = async (
  id: string,
  payload: Partial<IPatient>
): Promise<IPatient | null> => {
  const isExist = await Patient.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found !');
  }

  const { name, ...patientData } = payload;

  const updatedUserData: Partial<IPatient> = { ...patientData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IPatient>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const objectId = new Types.ObjectId(id); // Convert string to ObjectId
  const result = await Patient.findOneAndUpdate(objectId, updatedUserData, {
    new: true,
  });
  return result;
};

// const deletePatient = async (email: string): Promise<IPatient | null> => {
//   // check if the patient is exist
//   const isExist = await Patient.findOne({ email });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found !');
//   }
//   const isUserExist = await User.findOne({ email });
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //delete patient first
//     const patient = await Patient.findOneAndDelete({ email }, { session });
//     if (!patient) {
//       throw new ApiError(404, 'Failed to delete patient');
//     }
//     //delete user
//     await User.deleteOne({ email });
//     session.commitTransaction();
//     session.endSession();

//     return patient;
//   } catch (error) {
//     session.abortTransaction();
//     throw error;
//   }
// };
const deletePatient = async (email: string): Promise<IPatient | null> => {
  const patient = await Patient.findOneAndDelete({ email });

  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found!');
  }

  const userDeletionResult = await User.deleteOne({ email });
  if (!userDeletionResult.deletedCount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return patient;
};

export const PatientsService = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
