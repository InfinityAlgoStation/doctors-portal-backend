import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAppointment } from './appointments.interface';
import { AppointmentsService } from './appointments.service';

const createAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...appointment } = req.body;
    const result = await AppointmentsService.createAppointment(appointment);

    sendResponse<IAppointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully!',
      data: result,
    });
  }
);

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentsService.getAllAppointments();

  sendResponse<IAppointment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieved successfully !',
    data: result,
  });
});
const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AppointmentsService.getSingleAppointment(id);

  sendResponse<IAppointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieved successfully !',
    data: result,
  });
});

export const AppointmentsController = {
  createAppointment,
  getAllAppointment,
  getSingleAppointment,
};
