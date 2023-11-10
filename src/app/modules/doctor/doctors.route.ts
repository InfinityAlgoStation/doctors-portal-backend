import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { DoctorsController } from './doctors.controller';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), DoctorsController.getAllDoctors);
router.post('/create-doctor', DoctorsController.createDoctor);
router.get('/:id', DoctorsController.getSingleDoctor);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  DoctorsController.updateDoctor
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DoctorsController.deleteDoctor
);

export const DoctorsRoutes = router;
