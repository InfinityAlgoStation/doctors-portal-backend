import httpStatus from 'http-status';
import { SortOrder, Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOptions from '../../../interfaces/paginations';
import { User } from '../user/users.model';
import { doctorSearchableFields } from './doctors.constant';
import { IDoctor, IDoctorFilters } from './doctors.interface';
import { Doctor } from './doctors.model';

const getAllDoctors = async (
  filters: IDoctorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDoctor[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: doctorSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Doctor.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Doctor.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDoctor = async (id: string): Promise<IDoctor | null> => {
  const result = await Doctor.findById(id);
  return result;
};

const updateDoctor = async (
  id: string,
  payload: Partial<IDoctor>
): Promise<IDoctor | null> => {
  const isExist = await Doctor.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found !');
  }

  const { name, ...doctorData } = payload;

  const updatedUserData: Partial<IDoctor> = { ...doctorData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IDoctor>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const objectId = new Types.ObjectId(id); // Convert string to ObjectId
  const result = await Doctor.findOneAndUpdate(objectId, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteDoctor = async (email: string): Promise<IDoctor | null> => {
  const doctor = await Doctor.findOneAndDelete({ email });

  if (!doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found!');
  }

  const userDeletionResult = await User.deleteOne({ email });
  if (!userDeletionResult.deletedCount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return doctor;
};

export const DoctorsService = {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
