import express from 'express';
import { AdminsRoutes } from '../modules/admin/admins.route';
import { AppointmentsRoutes } from '../modules/appointment/appointments.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DoctorsRoutes } from '../modules/doctor/doctors.route';
import { FeedbacksRoutes } from '../modules/feedback/feedbacks.route';
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
    path: '/appointments',
    route: AppointmentsRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbacksRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
