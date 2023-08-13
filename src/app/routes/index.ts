import express from 'express';
import { UserRoutes } from '../modules/user/users.route';

const router = express.Router();

const modulesRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
