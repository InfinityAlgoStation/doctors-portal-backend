import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/users.model';
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

const getAllAppointments = async (userId: string): Promise<IAppointment[]> => {
  let appointments: IAppointment[];
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.role === 'admin') {
    appointments = await Appointment.find()
      .populate('doctor')
      .populate('patient');
  } else if (user.role === 'doctor' || user.role === 'patient') {
    const appointmentFilter = {
      $or: [{ doctor: userId }, { patient: userId }],
    };
    appointments = await Appointment.find(appointmentFilter)
      .populate('doctor')
      .populate('patient');
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
  }

  if (!appointments || appointments.length === 0) {
    throw new ApiError(400, 'No Appointments found.');
  }

  return appointments;
};

const getSingleAppointment = async (
  appointmentId: string,
  userId: string
): Promise<IAppointment | null> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  let appointment;
  if (user.role === 'doctor' || user.role === 'patient') {
    const appointmentFilter = {
      _id: appointmentId,
      $or: [{ doctor: userId }, { patient: userId }],
    };
    appointment = await Appointment.findOne(appointmentFilter)
      .populate('doctor')
      .populate('patient');
  } else if (user.role === 'admin') {
    appointment = await Appointment.findById(appointmentId)
      .populate('doctor')
      .populate('patient');
  }
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  return appointment;
};

export const AppointmentsService = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
};
