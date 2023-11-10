import express from 'express';
import { AppointmentsController } from './appointments.controller';

const router = express.Router();

router.post('/book-appointment', AppointmentsController.bookingAppointment);
router.patch(
  '/cancel-appointment/:id',
  AppointmentsController.cancelAppointment
);
router.patch('/start-appointment/:id', AppointmentsController.startAppointment);
router.patch(
  '/finish-appointment/:id',
  AppointmentsController.finishAppointment
);
router.get('/', AppointmentsController.getAllAppointment);
router.get('/:id', AppointmentsController.getSingleAppointment);
router.patch('/:id', AppointmentsController.updateAppointment);
router.delete('/:id', AppointmentsController.deleteAppointment);

export const AppointmentsRoutes = router;
