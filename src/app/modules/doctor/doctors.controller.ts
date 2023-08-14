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

export const DoctorsController = {
  createDoctor,
  getAllDoctors,
};
