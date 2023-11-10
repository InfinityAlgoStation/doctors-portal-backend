import { Doctor } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { doctorFilterableFields } from './doctors.constant';
import { DoctorsService } from './doctors.service';

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorsService.createDoctor(req.body);
  sendResponse<Doctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor successfully created',
    data: result,
  });
});

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DoctorsService.getAllDoctors(filters, paginationOptions);

  sendResponse<Doctor[]>(res, {
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

  sendResponse<Doctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor retrieved successfully !',
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DoctorsService.updateDoctor(id, updatedData);

  sendResponse<Doctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor updated successfully !',
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;

  const result = await DoctorsService.deleteDoctor(email);

  sendResponse<Doctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully !',
    data: result,
  });
});

export const DoctorsController = {
  createDoctor,
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
