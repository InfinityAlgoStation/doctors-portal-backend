import { AvailableDoctor } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AvailableDoctorService } from './availableDoctor.services';

const createAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { ...availableDoctorData } = req.body;
    const result = await AvailableDoctorService.createAvailableDoctor(
      availableDoctorData
    );
    sendResponse<AvailableDoctor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableDoctorData successfully created',
      data: result,
    });
  }
);

const getAllAvailableDoctors = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AvailableDoctorService.getAllAvailableDoctors();
    sendResponse<AvailableDoctor[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableDoctorData successfully fetched ',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AvailableDoctorService.getSingleAvailableDoctor(id);
    sendResponse<AvailableDoctor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableDoctorData successfully fetched',
      data: result,
    });
  }
);

const updateAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...availableDoctorData } = req.body;
    const result = await AvailableDoctorService.updateAvailableDoctor(
      id,
      availableDoctorData
    );
    sendResponse<AvailableDoctor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableDoctorData successfully update',
      data: result,
    });
  }
);

const deleteAvailableDoctor = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AvailableDoctorService.deleteAvailableDoctor(id);
    sendResponse<AvailableDoctor>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableDoctorData successfully delete',
      data: result,
    });
  }
);

export const AvailableDoctorController = {
  createAvailableDoctor,
  getAllAvailableDoctors,
  getSingleAvailableDoctor,
  updateAvailableDoctor,
  deleteAvailableDoctor,
};
