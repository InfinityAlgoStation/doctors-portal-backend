import { Patient } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PatientService } from './patients.service';

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const { medicalProfile, ...patientData } = req.body;
  const result = await PatientService.createPatient(
    patientData,
    medicalProfile
  );

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully !',
    data: result,
  });
});
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.getAllPatients();

  sendResponse<Patient[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'doctor retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});
const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PatientService.getSinglePatient(id);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieved successfully !',
    data: result,
  });
});

// const getPatientProfile = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.user as JwtPayload; // Perform a type assertion to JwtPayload
//   const result = await PatientServices.getPatientProfile(id);

//   sendResponse<Patient>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User retrieved successfully !',
//     data: result,
//   });
// });

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await PatientService.updatePatient(id, updatedData);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient updated successfully !',
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PatientService.deletePatient(id);

  sendResponse<Patient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient deleted successfully !',
    data: result,
  });
});

export const PatientController = {
  createPatient,
  getAllPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
