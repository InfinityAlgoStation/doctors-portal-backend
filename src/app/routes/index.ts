import express from 'express';
import { AdminsRoutes } from '../modules/admin/admins.route';
import { DoctorsRoutes } from '../modules/doctor/doctors.route';
import { PatientsRoutes } from '../modules/patient/patients.route';
import { UsersRoutes } from '../modules/user/users.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/doctors',
    route: DoctorsRoutes,
  },
  {
    path: '/admins',
    route: AdminsRoutes,
  },
  {
    path: '/patients',
    route: PatientsRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
