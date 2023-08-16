import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

//router.post('/create-user', UsersController.createUser);
router.post('/create-doctor', UsersController.createDoctor);
router.post('/create-patient', UsersController.createPatient);
router.post('/create-admin', UsersController.createAdmin);

export const UsersRoutes = router;
