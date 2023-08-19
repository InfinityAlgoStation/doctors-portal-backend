import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AppointmentsController } from './appointments.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.PATIENT),
  AppointmentsController.createAppointment
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  AppointmentsController.getSingleAppointment
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  AppointmentsController.getAllAppointment
);

export const AppointmentRoutes = router;
