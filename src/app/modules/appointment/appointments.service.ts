import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/users.model';
import { IAppointment } from './appointments.interface';
import { Appointment } from './appointments.model';

const bookingAppointment = async (
  appointment: IAppointment
): Promise<IAppointment | null> => {
  const createdAppointment = await Appointment.create(appointment);

  if (!createdAppointment) {
    throw new ApiError(400, 'failed to create Appointment !');
  }

  const populatedAppointment = (
    await createdAppointment.populate('doctor')
  ).populate('patient');

  return populatedAppointment;
};

const getAllAppointments = async (userId: string): Promise<IAppointment[]> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let appointments: IAppointment[];
  if (user.role === 'admin') {
    appointments = await Appointment.find()
      .populate('doctor')
      .populate('patient');
  } else if (user.role === 'doctor') {
    appointments = await Appointment.find({ doctor: user.doctor?._id })
      .populate('doctor')
      .populate('patient');
  } else if (user.role === 'patient') {
    if (!user.patient) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid user role');
    }
    appointments = await Appointment.find({ patient: user.patient._id })
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
      $or: [{ doctor: user.doctor?._id }, { patient: user.patient?._id }],
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

const updateAppointment = async (
  id: string,
  payload: Partial<IAppointment>
): Promise<IAppointment | null> => {
  const isExist = await Appointment.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found !');
  }

  const { ...appointmentData } = payload;

  const updatedAppointmentData: Partial<IAppointment> = { ...appointmentData };

  const objectId = new Types.ObjectId(id); // Convert string to ObjectId
  const result = await Appointment.findOneAndUpdate(
    objectId,
    updatedAppointmentData,
    {
      new: true,
    }
  );
  return result;
};

export const AppointmentsService = {
  bookingAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
};
