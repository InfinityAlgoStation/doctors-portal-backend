import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validedRequest';
import { AdminsController } from './admins.controller';
import { AdminsValidation } from './admins.validation';

const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), AdminsController.getSingleAdmin);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminsValidation.adminValidationUpdateZodSchema),
  AdminsController.updateAdmin
);
router.delete(
  '/:email',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminsController.deleteAdmin
);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminsController.getAdminProfile
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), AdminsController.getAllAdmin);

export const AdminsRoutes = router;
