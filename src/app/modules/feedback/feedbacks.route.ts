import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbacksController } from './feedbacks.controller';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  FeedbacksController.getSingleFeedback
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedbacksController.deleteFeedback
);

router.post('/', auth(ENUM_USER_ROLE.PATIENT), FeedbacksController.addFeedback);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  FeedbacksController.getAllFeedback
);

export const FeedbacksRoutes = router;
