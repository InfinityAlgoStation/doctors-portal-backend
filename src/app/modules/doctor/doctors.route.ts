import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { DoctorsController } from './doctors.controller';
import { DoctorValidation } from './doctors.validation';

const router = express.Router();

router.get('/:id', DoctorsController.getSingleDoctor);
router.patch(
  '/:id',
  validateRequest(DoctorValidation.doctorValidationUpdateZodSchema),
  DoctorsController.updateUser
);
router.delete('/:id', DoctorsController.deleteDoctor);
router.post(
  '/create-doctor',
  validateRequest(DoctorValidation.doctorValidationCreateZodSchema),
  DoctorsController.createDoctor
);
router.get('/', DoctorsController.getAllDoctors);

export const DoctorsRoutes = router;
