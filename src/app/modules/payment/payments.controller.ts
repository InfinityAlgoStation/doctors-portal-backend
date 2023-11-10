import { Payment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payments.services';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { ...PaymentData } = req.body;
  const result = await PaymentService.createPayment(PaymentData);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentData successfully created',
    data: result,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments();
  sendResponse<Payment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentData successfully fetched ',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.getSinglePayment(id);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentData successfully fetched',
    data: result,
  });
});

const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...PaymentData } = req.body;
  const result = await PaymentService.updatePayment(id, PaymentData);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentData successfully update',
    data: result,
  });
});

const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.deletePayment(id);
  sendResponse<Payment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentData successfully delete',
    data: result,
  });
});

export const paymentController = {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
