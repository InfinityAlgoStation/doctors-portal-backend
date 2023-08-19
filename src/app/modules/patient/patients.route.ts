import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { PatientsController } from './patients.controller';
import { PatientsValidation } from './patients.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientsController.getSinglePatient
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PATIENT),
  validateRequest(PatientsValidation.patientValidationUpdateZodSchema),
  PatientsController.updatePatient
);
router.delete(
  '/:email',
  auth(ENUM_USER_ROLE.ADMIN),
  PatientsController.deletePatient
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientsController.getAllPatient
);

export const PatientsRoutes = router;
