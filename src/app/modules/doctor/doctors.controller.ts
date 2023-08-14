import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { doctorFilterableFields } from './doctors.constant';
import { IDoctor } from './doctors.interface';
import { DoctorsService } from './doctors.service';

const createDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...doctor } = req.body;
    const result = await DoctorsService.createDoctor(doctor);

    sendResponse<IDoctor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'doctor created successfully!',
      data: result,
    });
  }
);

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DoctorsService.getAllDoctors(filters, paginationOptions);

  sendResponse<IDoctor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'doctor retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DoctorsService.getSingleDoctor(id);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DoctorsService.updateDoctor(id, updatedData);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DoctorsService.deleteDoctor(id);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully !',
    data: result,
  });
});

export const DoctorsController = {
  createDoctor,
  getAllDoctors,
  getSingleDoctor,
  updateUser,
  deleteDoctor,
};
