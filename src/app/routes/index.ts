import express from 'express';
import { AdminsRoutes } from '../modules/admin/admins.route';
import { AppointmentsRoutes } from '../modules/appointment/appointments.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AvailableDoctorRoutes } from '../modules/availableDoctor/availableDoctor.routes';
import { AvailableServiceRoutes } from '../modules/availableService/availableServices.routes';
import { DoctorsRoutes } from '../modules/doctor/doctors.route';
import { FeedbacksRoutes } from '../modules/feedback/feedbacks.route';
import { PatientsRoutes } from '../modules/patient/patients.route';
import { PaymentRoutes } from '../modules/payment/payments.routes';
import { ServiceRoutes } from '../modules/service/service.route';
import { SpecializationRoutes } from '../modules/specialization/specialization.routes';
import { SuperAdminRoutes } from '../modules/superAdmin/superAdmin.routes';
import { TimeSlotsRoutes } from '../modules/timeSlot/timeSlot.routes';

const router = express.Router();

const modulesRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/super-admins',
    route: SuperAdminRoutes,
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
    path: '/specializations',
    route: SpecializationRoutes,
  },
  {
    path: '/patients',
    route: PatientsRoutes,
  },
  // {
  //   path: '/medical-profiles',
  //   route: medicalProfileRoute,
  // },
  {
    path: '/appointments',
    route: AppointmentsRoutes,
  },
  {
    path: '/available-doctors',
    route: AvailableDoctorRoutes,
  },
  {
    path: '/available-services',
    route: AvailableServiceRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/time-slots',
    route: TimeSlotsRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbacksRoutes,
  },
];

modulesRoute.map(route => router.use(route.path, route.route));

export default router;
