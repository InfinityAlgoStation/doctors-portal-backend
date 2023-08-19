import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { DoctorsController } from './doctors.controller';
import { DoctorValidation } from './doctors.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DoctorsController.getSingleDoctor
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  validateRequest(DoctorValidation.doctorValidationUpdateZodSchema),
  DoctorsController.updateDoctor
);
router.delete(
  '/:email',
  auth(ENUM_USER_ROLE.ADMIN),
  DoctorsController.deleteDoctor
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DoctorsController.getAllDoctors
);

export const DoctorsRoutes = router;
