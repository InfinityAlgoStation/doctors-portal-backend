/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;
  if (!email || !password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'email & password needed');
  }

  let isUserExist: any;
  const superAdmin = await prisma.superAdmin.findUnique({
    where: { email },
  });
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!superAdmin && !admin && !patient && !doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (superAdmin || admin || patient || doctor) {
    isUserExist = superAdmin || admin || patient || doctor;
  }
  if (isUserExist && isUserExist.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //create access token & refresh token
  const { id: userId, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token is required');
  }

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { id, role } = verifiedToken;
  // checking deleted user's refresh token
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token');
  }

  const superAdmin = await prisma.superAdmin.findUnique({
    where: { id },
  });
  const admin = await prisma.admin.findUnique({
    where: { id },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });
  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  if (!superAdmin && !admin && !patient && !doctor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
