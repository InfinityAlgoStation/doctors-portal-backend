import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admins.interface';
import { AdminsService } from './admins.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminsService.getAllAdmins();

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminsService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});

const getAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user as JwtPayload; // Perform a type assertion to JwtPayload
  const result = await AdminsService.getAdminProfile(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminsService.updateAdmin(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await AdminsService.deleteAdmin(email);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const AdminsController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
};
