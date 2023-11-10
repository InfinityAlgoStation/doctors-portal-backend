import { SuperAdmin } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SuperAdminServices } from './superAdmin.service';

const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminServices.createSuperAdmin(req.body);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin retrieved successfully !',
    data: result,
  });
});
const getAllSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await SuperAdminServices.getAllSuperAdmins();

  sendResponse<SuperAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'doctor retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SuperAdminServices.getSingleSuperAdmin(id);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin retrieved successfully !',
    data: result,
  });
});

// const getSuperAdminProfile = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.user as JwtPayload; // Perform a type assertion to JwtPayload
//   const result = await SuperAdminServices.getSuperAdminProfile(id);

//   sendResponse<SuperAdmin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User retrieved successfully !',
//     data: result,
//   });
// });

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SuperAdminServices.updateSuperAdmin(id, updatedData);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin updated successfully !',
    data: result,
  });
});

const deleteSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminServices.deleteSuperAdmin(id);

  sendResponse<SuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin deleted successfully !',
    data: result,
  });
});

export const SuperAdminsController = {
  createSuperAdmin,
  getAllSuperAdmin,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
