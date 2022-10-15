import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { createResponseSuccess, createSlug, sendEmail, validateEmail } from '../helpers';
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
  generateResetPasswordToken,
} from '../helpers/generateToken';
import { AuthModel, NoteModel, TopicModel } from '../models';
import {
  DecodedToken,
  Meta,
  NewUser,
  StatusUser,
  Token,
  TypeLogin,
  User,
  UserChangePassword,
  UserResetPassword,
  UserDocument,
  UserLogin,
} from '../types';

const CLIENT_URL = process.env.CLIENT_URL;

// Register
export const register = async (body: NewUser, config?: { sendEmail: boolean }) => {
  const {
    username,
    email,
    password,
    fullname = '',
    avatar,
    status = StatusUser.pending,
    type = TypeLogin.register,
  } = body;

  let meta: Token;

  const userLoginByUsername = await AuthModel.findOne({ username });

  if (userLoginByUsername) throw createHttpError(400, 'Username has already exist!');

  const userLoginByEmail = await AuthModel.findOne({ email });

  if (userLoginByEmail) throw createHttpError(400, 'Email has already exist!');

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new AuthModel({
    fullname,
    username,
    email,
    avatar,
    type,
    status,
    password: passwordHash,
    slug: createSlug(username),
  });

  await newUser.save();

  if (config?.sendEmail) {
    const active_token = generateActiveToken({
      _id: newUser._id,
    });

    const url = `${CLIENT_URL}/auth/active/${active_token}`;

    meta = {
      active_token,
    };
    // Send email to verify account
    await sendEmail({
      to: email,
      username,
      url,
      description:
        "Congratulations! You're almost set to start using Note App. Just click the button below to validate your email address.",
      btnText: 'Verify your email address',
    });
  } else {
    const access_token = generateAccessToken({ _id: newUser._id });
    meta = {
      access_token,
    };
  }

  return createResponseSuccess<User, Token>({
    status: 201,
    data: { ...newUser._doc, password: '' } as User,
    message: 'Register successfully. Please check your email to verify account',
    meta,
  });
};

// Active Account
export const activeAccount = async (activeToken: string) => {
  const decodedToken = jwt.verify(
    activeToken,
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
  if (user.status === 'banned') throw createHttpError(400, 'Your account has been banned');

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

// Login by google
export const loginByGoogle = async (tokenId: string) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '';
  const client = new OAuth2Client(clientId);

  const verifyToken = await client.verifyIdToken({ idToken: tokenId, audience: clientId });

  const googlePayload = verifyToken.getPayload();

  if (!googlePayload) throw createHttpError(400, 'Get payload verify token google auth failed');

  const { name = '', email = '', picture = '', at_hash = '' } = googlePayload;

  const user = await AuthModel.findOne({ email });

  // If found user
  if (user) {
    const access_token = generateAccessToken({ _id: user._id });
    const refresh_token = generateRefreshToken({ _id: user._id });

    return createResponseSuccess<User, Token>({
      data: { ...user._doc, password: '' } as User,
      message: 'Login by google successfully!',
      meta: {
        access_token,
        refresh_token,
      },
    });
  }
  // If has not found email, register new account
  else {
    const [username] = email.split('@');

    const response = await register({
      fullname: name,
      username,
      avatar: picture,
      email,
      password: `${email}-${at_hash}`,
      status: StatusUser.active,
      type: TypeLogin.google,
    });

    return createResponseSuccess({
      data: response.data,
      message: 'Login by google successfully',
      meta: response.meta,
    });
  }
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
// Reset Password
export const resetPassword = async (data: UserResetPassword) => {
  const { newPassword, user } = data;

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

  const access_token = generateResetPasswordToken({ _id: user._id });
  const url = `${CLIENT_URL}/auth/reset-password/${access_token}`;

  await sendEmail({
    to: email,
    btnText: 'Reset Password',
    url,
    description: 'Congratulations! Click the button below to validate your email address.',
    username: user.username,
  });

  return createResponseSuccess<null, Token>({
    data: null,
    message: 'Sucessfully. Check your email to change password',
    meta: { access_token },
  });
};
// Info user
export const getInfoUser = async (user: User) => {
  const _user = { ...user, password: '' };

  const totalTopicsPromise = TopicModel.countDocuments({ user: user._id });
  const totalNotesPromise = NoteModel.countDocuments({ user: user._id });

  const [totalTopics, totalNotes] = await Promise.all([totalTopicsPromise, totalNotesPromise]);

  return createResponseSuccess({
    data: { ..._user, total_topics: totalTopics, total_notes: totalNotes },
    message: 'Get info user successfully',
  });
};
export const getAccounts = async () => {
  const accounts = await AuthModel.find();

  return createResponseSuccess({ data: accounts, message: 'Get accounts successfully' });
};
// Ban account
export const banAccount = async (user: User, accountId: string) => {
  const accountBanned = await AuthModel.findByIdAndUpdate(
    accountId,
    { status: StatusUser.banned },
    { new: true }
  ).select('-password');

  if (!accountBanned) throw createHttpError(400, `Account has id: ${accountId} does not exist`);

  return createResponseSuccess({
    data: accountBanned,
    message: `Ban account has id :"${accountId}" successfully`,
  });
};
