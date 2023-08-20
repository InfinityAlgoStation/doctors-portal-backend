import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IFeedback } from './feedbacks.interface';
import { FeedbacksService } from './feedbacks.service';

const addFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...feedback } = req.body;
    const result = await FeedbacksService.addFeedback(feedback);

    sendResponse<IFeedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback created successfully!',
      data: result,
    });
  }
);

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbacksService.getAllFeedback();

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieved successfully !',
    data: result,
  });
});

const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbacksService.getSingleFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieved successfully !',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await FeedbacksService.deleteFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully !',
    data: result,
  });
});

export const FeedbacksController = {
  addFeedback,
  getAllFeedback,
  getSingleFeedback,
  deleteFeedback,
};
