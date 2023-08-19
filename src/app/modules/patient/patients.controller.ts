import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IPatient } from './patients.interface';
import { PatientsService } from './patients.service';

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientsService.getAllPatients();

  sendResponse<IPatient[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully !',
    data: result,
  });
});
const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PatientsService.getSinglePatient(id);

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully !',
    data: result,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await PatientsService.updatePatient(id, updatedData);

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient updated successfully !',
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await PatientsService.deletePatient(email);

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient deleted successfully !',
    data: result,
  });
});

export const PatientsController = {
  getAllPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
