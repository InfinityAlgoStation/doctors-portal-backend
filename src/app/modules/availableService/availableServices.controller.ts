import { AvailableService } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AvailableServiceService } from './availableServices.services';

const createAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const { ...availableServiceData } = req.body;
    const result = await AvailableServiceService.createAvailableService(
      availableServiceData
    );
    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableServiceData successfully created',
      data: result,
    });
  }
);

const getAllAvailableServices = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AvailableServiceService.getAllAvailableServices();
    sendResponse<AvailableService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableServiceData successfully fetched ',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AvailableServiceService.getSingleAvailableService(id);
    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableServiceData successfully fetched',
      data: result,
    });
  }
);

const updateAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...availableServiceData } = req.body;
    const result = await AvailableServiceService.updateAvailableService(
      id,
      availableServiceData
    );
    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableServiceData successfully update',
      data: result,
    });
  }
);

const deleteAvailableService = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AvailableServiceService.deleteAvailableService(id);
    sendResponse<AvailableService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'availableServiceData successfully delete',
      data: result,
    });
  }
);

export const availableServiceController = {
  createAvailableService,
  getAllAvailableServices,
  getSingleAvailableService,
  updateAvailableService,
  deleteAvailableService,
};
