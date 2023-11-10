import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { SuperAdminsController } from './superAdmin.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminsController.getAllSuperAdmin
);

router.post('/create-super-admin', SuperAdminsController.createSuperAdmin);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminsController.getSingleSuperAdmin
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminsController.updateSuperAdmin
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  SuperAdminsController.deleteSuperAdmin
);

export const SuperAdminRoutes = router;
