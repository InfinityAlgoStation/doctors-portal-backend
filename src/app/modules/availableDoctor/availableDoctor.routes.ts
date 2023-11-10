import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AvailableDoctorController } from './availableDoctor.controller';

const router = express.Router();

router.post(
  '/create-available-doctor',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AvailableDoctorController.createAvailableDoctor
);
router.get('/', AvailableDoctorController.getAllAvailableDoctors);
router.get('/:id', AvailableDoctorController.getSingleAvailableDoctor);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AvailableDoctorController.updateAvailableDoctor
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AvailableDoctorController.deleteAvailableDoctor
);

export const AvailableDoctorRoutes = router;
