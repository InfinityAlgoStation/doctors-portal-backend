import { Admin } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminServices } from './admins.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.createAdmin(req.body);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdmins();

  sendResponse<Admin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'doctor retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminServices.getSingleAdmin(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});

// const getAdminProfile = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.user as JwtPayload; // Perform a type assertion to JwtPayload
//   const result = await AdminServices.getAdminProfile(id);

//   sendResponse<Admin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User retrieved successfully !',
//     data: result,
//   });
// });

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminServices.updateAdmin(id, updatedData);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminServices.deleteAdmin(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const AdminsController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
