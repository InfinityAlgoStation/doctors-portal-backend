import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { PatientController } from './patients.controller';
import { PatientsValidation } from './patients.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientController.getSinglePatient
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PATIENT),
  validateRequest(PatientsValidation.patientValidationUpdateZodSchema),
  PatientController.updatePatient
);
router.delete(
  '/:email',
  auth(ENUM_USER_ROLE.ADMIN),
  PatientController.deletePatient
);
router.get(
  '/',
  //auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientController.getAllPatient
);
router.post('/create-patient', PatientController.createPatient);
export const PatientsRoutes = router;
