import { Service } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...serviceData } = req.body;
  const service = await ServiceService.createService(serviceData);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: service,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const services = await ServiceService.getAllServices();
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: services.meta,
    data: services.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const service = await ServiceService.getSingleService(id);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: service,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...serviceData } = req.body;
  const service = await ServiceService.updateService(id, serviceData);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: service,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const service = await ServiceService.deleteService(id);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: service,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
