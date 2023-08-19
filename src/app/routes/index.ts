import express from 'express';
import { AdminsRoutes } from '../modules/admin/admins.route';
import { AppointmentRoutes } from '../modules/appointment/appointments.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DoctorsRoutes } from '../modules/doctor/doctors.route';
import { PatientsRoutes } from '../modules/patient/patients.route';
import { UsersRoutes } from '../modules/user/users.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/admins',
    route: AdminsRoutes,
  },
  {
    path: '/doctors',
    route: DoctorsRoutes,
  },
  {
    path: '/patients',
    route: PatientsRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
