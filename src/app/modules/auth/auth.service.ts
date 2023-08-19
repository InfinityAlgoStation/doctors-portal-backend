import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/users.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'email & password needed');
  }
  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { id, email: userEmail, role } = isUserExist;
  console.log(isUserExist);

  const accessToken = jwtHelpers.createToken(
    { id, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;
  // checking deleted user's refresh token
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: user.id,
      userEmail: user.email,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
