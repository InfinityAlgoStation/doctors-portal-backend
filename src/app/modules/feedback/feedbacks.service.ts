import ApiError from '../../../errors/ApiErrors';
import { IFeedback } from './feedbacks.interface';
import { Feedback } from './feedbacks.model';

const addFeedback = async (feedback: IFeedback): Promise<IFeedback | null> => {
  const createdFeedback = await Feedback.create(feedback);
  if (!createdFeedback) {
    throw new ApiError(400, 'failed to create Feedback !');
  }
  return createdFeedback;
};

const getAllFeedback = async (): Promise<IFeedback[]> => {
  const allFeedback = await Feedback.find({})
    .populate('doctor')
    .populate('patient');
  if (!allFeedback || allFeedback.length === 0) {
    throw new ApiError(400, 'No feedback found.');
  }
  return allFeedback;
};

const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findByIdAndDelete(id);
  return result;
};

const getSingleFeedback = async (id: string): Promise<IFeedback | null> => {
  const feedback = await Feedback.findById(id)
    .populate('doctor')
    .populate('patient');
  if (!feedback) {
    throw new ApiError(404, 'Feedback not found');
  }

  return feedback;
};

export const FeedbacksService = {
  addFeedback,
  getAllFeedback,
  deleteFeedback,
  getSingleFeedback,
};
