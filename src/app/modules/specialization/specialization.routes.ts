import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SpecializationController } from './specialization.controller';

const router = express.Router();

router.post(
  '/create-specialization',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecializationController.createSpecialization
);
router.get('/', SpecializationController.getAllSpecializations);
router.get('/:id', SpecializationController.getSingleSpecialization);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecializationController.updateSpecialization
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SpecializationController.deleteSpecialization
);

export const SpecializationRoutes = router;
