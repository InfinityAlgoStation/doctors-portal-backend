import express from 'express';
import validateRequest from '../../middlewares/validedRequest';
import { AdminsController } from './admins.controller';
import { AdminsValidation } from './admins.validation';

const router = express.Router();

router.get('/:id', AdminsController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminsValidation.adminValidationUpdateZodSchema),
  AdminsController.updateAdmin
);
router.delete('/:id', AdminsController.deleteAdmin);
// router.post(
//   '/',
//   validateRequest(AdminsValidation.adminValidationCreateZodSchema),
//   AdminsController.createAdmin
// );
router.get('/', AdminsController.getAllAdmin);

export const AdminsRoutes = router;
