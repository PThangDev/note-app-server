import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { createResponseSuccess, createSlug, sendEmail, validateEmail } from '../helpers';
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from '../helpers/generateToken';
import { AuthModel } from '../models';
import {
  DecodedToken,
  NewUser,
  Token,
  User,
  UserChangePassword,
  UserDocument,
  UserLogin,
} from '../types';

const CLIENT_URL = process.env.CLIENT_URL;

// Register
export const register = async (body: NewUser) => {
  const { username, email, password } = body;

  const userLoginByUsername = await AuthModel.findOne({ username });

  if (userLoginByUsername) throw createHttpError(400, 'Username has already exist!');

  const userLoginByEmail = await AuthModel.findOne({ email });

  if (userLoginByEmail) throw createHttpError(400, 'Email has already exist!');

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new AuthModel({
    username,
    password: passwordHash,
    email,
    slug: createSlug(username),
  });

  await newUser.save();

  const active_token = generateActiveToken({
    _id: newUser._id,
  });

  const url = `${CLIENT_URL}/auth/active/${active_token}`;

  await sendEmail(email, url, 'Verify your email address');

  return createResponseSuccess<User, Token & { url: string }>({
    status: 201,
    data: { ...newUser._doc, password: '' } as User,
    message: '',
    meta: {
      active_token,
      url,
    },
  });
};

// Active Account
export const activeAccount = async (active_token: string) => {
  const decodedToken = jwt.verify(
    active_token,
    `${process.env.ACTIVE_TOKEN_SECRET}`
  ) as DecodedToken;

  const { _id } = decodedToken;

  if (!_id) throw createHttpError(401, 'Invalid authentication');

  const activeUser = await AuthModel.findByIdAndUpdate(
    _id,
    { status: 'active' },
    { new: true }
  ).select('-password');

  return createResponseSuccess({ data: activeUser, message: 'Account has been activated ' });
};

// Login
export const login = async (data: UserLogin) => {
  const { account, password } = data;
  let user: UserDocument | null;

  if (validateEmail(account)) {
    user = await AuthModel.findOne({ email: account });
  } else {
    user = await AuthModel.findOne({ username: account });
  }
  // If cannot find user
  if (!user) throw createHttpError(400, 'Username or Email does not exists');
  if (user.status === 'pending')
    throw createHttpError(400, 'Account has not actived. Please check your email');
  if (user.status === 'banned') throw createHttpError(400, 'Account has banned');

  // Compare password
  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) throw createHttpError(400, 'Password is incorrect');

  const access_token = generateAccessToken({ _id: user._id });
  const refresh_token = generateRefreshToken({ _id: user._id });

  return createResponseSuccess<User, Token>({
    data: { ...user._doc, password: '' } as User,
    message: 'Login successfully!',
    meta: {
      access_token,
      refresh_token,
    },
  });
};

// Change password
export const changePassword = async (data: UserChangePassword) => {
  const { oldPassword, newPassword, user } = data;

  // Compare old password
  const isMatchPassword = await bcrypt.compare(oldPassword, user.password);

  if (!isMatchPassword) throw createHttpError(400, 'Old password does not match');

  const newPasswordHash = await bcrypt.hash(newPassword, 12);

  await AuthModel.findByIdAndUpdate(user._id, { password: newPasswordHash }, { new: true });

  return createResponseSuccess({
    data: null,
    message: 'Change password successfully!',
  });
};

// Forgot password
export const forgotPassword = async (email: string) => {
  const user = await AuthModel.findOne({ email });

  if (!user) throw createHttpError(400, 'Email does not exists');

  if (user.type !== 'register')
    throw createHttpError(400, `Quick login account with ${user.type} can't use this function.`);

  const access_token = generateAccessToken({ _id: user._id });
  const url = `${CLIENT_URL}/reset-password/${access_token}`;

  await sendEmail(email, url, 'Forgot password?');

  return createResponseSuccess<null, Token>({
    data: null,
    message: 'Sucessfully. Check your email to change password',
    meta: { access_token },
  });
};
// Info user
export const getInfoUser = async (user: User) => {
  const _user = { ...user, password: '' };

  return createResponseSuccess({ data: _user, message: 'Get info user successfully' });
};
