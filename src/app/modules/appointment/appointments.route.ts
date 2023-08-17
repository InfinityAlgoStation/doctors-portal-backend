import express from 'express';
import { AppointmentsController } from './appointments.controller';

const router = express.Router();

router.post('/', AppointmentsController.createAppointment);
router.get('/:id', AppointmentsController.getSingleAppointment);
router.get('/', AppointmentsController.getAllAppointment);

export const AppointmentRoutes = router;
