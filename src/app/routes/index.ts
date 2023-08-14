import express from 'express';
import { DoctorsRoutes } from '../modules/doctor/doctors.route';
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
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
