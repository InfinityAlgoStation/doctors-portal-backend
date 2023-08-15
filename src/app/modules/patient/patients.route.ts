import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { PatientsController } from './patients.controller';
import { PatientsValidation } from './patients.validation';

const router = express.Router();

router.get('/:id', PatientsController.getSinglePatient);
router.patch(
  '/:id',
  validateRequest(PatientsValidation.patientValidationUpdateZodSchema),
  PatientsController.updatePatient
);
router.delete('/:id', PatientsController.deletePatient);
router.post(
  '/',
  validateRequest(PatientsValidation.patientValidationCreateZodSchema),
  PatientsController.createPatient
);
router.get('/', PatientsController.getAllPatient);

export const PatientsRoutes = router;
