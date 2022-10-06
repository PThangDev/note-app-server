import { Request } from 'express';

export enum TypeLogin {
  'register' = 'register',
  'google' = 'google',
  'facebook' = 'facebook',
}
export enum RoleUser {
  'admin' = 'admin',
  'customer' = 'customer',
}

export enum StatusUser {
  'pending' = 'pending',
  'active' = 'active',
  'banned' = 'banned',
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: RoleUser;
  type: TypeLogin;
  status: StatusUser;
}

export interface UserDocument extends User, Document {
  _doc: User;
}

export type NewUser = Pick<User, 'username' | 'email' | 'password'> &
  Partial<Pick<User, 'fullname' | 'avatar' | 'type'>>;

export type UserLogin = Pick<User, 'password'> & {
  account: string;
};

export interface UserChangePassword {
  oldPassword: string;
  newPassword: string;
  user: User;
}

export interface RequestAuth extends Request {
  user?: User;
}
