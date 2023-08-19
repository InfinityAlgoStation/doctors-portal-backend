import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/users.model';
import { IAdmin } from './admins.interface';
import { Admin } from './admins.model';

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const createdAdmin = await Admin.create(admin);
  if (!createdAdmin) {
    throw new ApiError(400, 'failed to create admin !');
  }
  return createdAdmin;
};

const getAllAdmins = async (): Promise<IAdmin[]> => {
  const allAdmins = await Admin.find({});
  if (!allAdmins || allAdmins.length === 0) {
    throw new ApiError(400, 'No admins found.');
  }
  return allAdmins;
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

const getAdminProfile = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { name, ...adminData } = payload;

  const updatedUserData: Partial<IAdmin> = { ...adminData };

  // dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const objectId = new Types.ObjectId(id); // Convert string to ObjectId
  const result = await Admin.findOneAndUpdate(objectId, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteAdmin = async (email: string): Promise<IAdmin | null> => {
  const admin = await Admin.findOneAndDelete({ email });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
  }

  const userDeletionResult = await User.deleteOne({ email });
  if (!userDeletionResult.deletedCount) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  return admin;
};

export const AdminsService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
};
