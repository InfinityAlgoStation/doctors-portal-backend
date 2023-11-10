import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { availableServiceController } from './availableServices.controller';

const router = express.Router();

router.post(
  '/create-available-service',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  availableServiceController.createAvailableService
);
router.get('/', availableServiceController.getAllAvailableServices);
router.get('/:id', availableServiceController.getSingleAvailableService);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  availableServiceController.updateAvailableService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  availableServiceController.deleteAvailableService
);

export const AvailableServiceRoutes = router;
