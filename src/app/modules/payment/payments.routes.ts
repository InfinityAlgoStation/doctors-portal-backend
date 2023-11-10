import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { paymentController } from './payments.controller';

const router = express.Router();

router.post(
  '/create-payment',
  auth(ENUM_USER_ROLE.PATIENT),
  paymentController.createPayment
);
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getSinglePayment);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  paymentController.updatePayment
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  paymentController.deletePayment
);

export const PaymentRoutes = router;
