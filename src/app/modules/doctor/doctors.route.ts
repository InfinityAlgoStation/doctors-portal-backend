import express from 'express';
import { DoctorsController } from './doctors.controller';

const router = express.Router();

router.post('/create-doctor', DoctorsController.createDoctor);
router.get('/', DoctorsController.getAllDoctors);

export const DoctorsRoutes = router;
