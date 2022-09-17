import bcrypt from 'bcrypt';
import createErrors from 'http-errors';
import jwt from 'jsonwebtoken';

import { createResponseSuccess, createSlug, validateEmail } from '../helpers';
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from '../helpers/generateToken';
import { AuthModel } from '../models';
import { DecodedToken, NewUser, Token, User, UserDocument, UserLogin } from '../types';

const CLIENT_URL = process.env.CLIENT_URL;

// register
export const register = async (body: NewUser) => {
  const { username, email, password } = body;

  const userLoginByUsername = await AuthModel.findOne({ username });

  if (userLoginByUsername) throw createErrors(400, 'Username has already exist!');

  const userLoginByEmail = await AuthModel.findOne({ email });

  if (userLoginByEmail) throw createErrors(400, 'Email has already exist!');

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

  return createResponseSuccess<User, Token & { url: string }>({
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

  if (!_id) throw createErrors(401, 'Invalid authentication');

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
  if (!user) throw createErrors(400, 'Username or Email does not exists');

  if (user.status === 'pending')
    throw createErrors(400, 'Account has not actived. Please check your email');
  if (user.status === 'banned') throw createErrors(400, 'Account has banned');

  // Compare password
  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) throw createErrors(400, 'Password is incorrect');

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
