import ApiError from '../../../errors/ApiErrors';
import { IAppointment } from './appointments.interface';
import { Appointment } from './appointments.model';

const createAppointment = async (
  appointment: IAppointment
): Promise<IAppointment | null> => {
  const createdAppointment = await Appointment.create(appointment);
  if (!createdAppointment) {
    throw new ApiError(400, 'failed to create Appointment !');
  }
  return createdAppointment;
};

const getAllAppointments = async (): Promise<IAppointment[]> => {
  const allAppointments = await Appointment.find({});
  if (!allAppointments || allAppointments.length === 0) {
    throw new ApiError(400, 'No Appointments found.');
  }
  return allAppointments;
};

const getSingleAppointment = async (
  id: string
): Promise<IAppointment | null> => {
  const result = await Appointment.findById(id);
  return result;
};

export const AppointmentsService = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
};
