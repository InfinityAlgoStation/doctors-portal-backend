import { TimeSlots } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TimeSlotService } from './timeSlot.service';

const createTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const { ...timeSlotData } = req.body;
  const TimeSlot = await TimeSlotService.createTimeSlot(timeSlotData);
  sendResponse<TimeSlots>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TimeSlot created successfully',
    data: TimeSlot,
  });
});
const getAllTimeSlots = catchAsync(async (req: Request, res: Response) => {
  const timeSlots = await TimeSlotService.getAllTimeSlots();
  sendResponse<TimeSlots[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TimeSlots fetched successfully',
    data: timeSlots.data,
  });
});
const getSingleTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const timeSlot = await TimeSlotService.getSingleTimeSlot(id);
  sendResponse<TimeSlots>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TimeSlot fetched successfully',
    data: timeSlot,
  });
});
const updateTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...TimeSlotData } = req.body;
  const timeSlot = await TimeSlotService.updateTimeSlot(id, TimeSlotData);
  sendResponse<TimeSlots>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TimeSlot updated successfully',
    data: timeSlot,
  });
});
const deleteTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const timeSlot = await TimeSlotService.deleteTimeSlot(id);
  sendResponse<TimeSlots>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TimeSlot deleted successfully',
    data: timeSlot,
  });
});

export const TimeSlotController = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
