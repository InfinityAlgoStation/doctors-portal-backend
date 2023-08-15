import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
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
const deletePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findByIdAndDelete(id);
  return result;
};

export const PatientsService = {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
