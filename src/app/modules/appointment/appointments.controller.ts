import { Appointment } from '@prisma/client';
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AppointmentService } from './appointments.service';

const bookingAppointment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { patientId, availableServiceId, appointmentDate } = req.body;
    const result = await AppointmentService.bookAppointment(
      patientId,
      availableServiceId,
      appointmentDate
    );

    sendResponse<Appointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully!',
      data: result,
    });
  }
);

const startAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment = await AppointmentService.startAppointment(id);
  res.status(200).json({
    status: 'success',
    message: 'Appointment started successfully',
    data: appointment,
  });
});
const cancelAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment = await AppointmentService.cancelAppointment(id);
  res.status(200).json({
    status: 'success',
    message: 'Appointment created successfully',
    data: appointment,
  });
});
const finishAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const appointment = await AppointmentService.finishAppointment(id);
  res.status(200).json({
    status: 'success',
    message: 'Appointment completed successfully',
    data: appointment,
  });
});

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.getAllAppointments();

  sendResponse<Appointment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AppointmentService.getSingleAppointment(id);

  sendResponse<Appointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieved successfully !',
    data: result,
  });
});

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AppointmentService.updateAppointment(id, updatedData);

  sendResponse<Appointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment updated successfully !',
    data: result,
  });
});
const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AppointmentService.deleteAppointment(id);

  sendResponse<Appointment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment delete successfully !',
    data: result,
  });
});

export const AppointmentsController = {
  bookingAppointment,
  startAppointment,
  cancelAppointment,
  finishAppointment,
  getAllAppointment,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
