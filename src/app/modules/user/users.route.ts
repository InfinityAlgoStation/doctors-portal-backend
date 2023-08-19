import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UsersController } from './users.controller';

const router = express.Router();

//router.post('/create-user', UsersController.createUser);
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  UsersController.getUserProfile
);
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  UsersController.updateUserProfile
);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UsersController.getSingleUser);
router.post('/create-doctor', UsersController.createDoctor);
router.post('/create-patient', UsersController.createPatient);
router.post('/create-admin', UsersController.createAdmin);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UsersController.getAllUsers);

export const UsersRoutes = router;
