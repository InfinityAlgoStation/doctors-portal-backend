import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './users.interface';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: 'String',
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

//is user exist
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'email'> | null> {
  return await User.findOne(
    { email },
    { id: 1, password: 1, role: 1, email: 1 }
  );
};
// is password match
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
// hash user password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.isModified('password')) {
    try {
      const saltRounds = Number(config);
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
      next();
    } catch (error) {
      next();
    }
  } else {
    next();
  }
});
export const User = model<IUser, UserModel>('User', userSchema);
