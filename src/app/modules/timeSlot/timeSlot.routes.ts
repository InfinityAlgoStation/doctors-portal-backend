import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { TimeSlotController } from './timeSlot.controller';

const router = express.Router();

router.post(
  '/create-time-slot',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TimeSlotController.createTimeSlot
);
router.get('/', TimeSlotController.getAllTimeSlots);
router.get('/:id', TimeSlotController.getSingleTimeSlot);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TimeSlotController.updateTimeSlot
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TimeSlotController.deleteTimeSlot
);

export const TimeSlotsRoutes = router;
