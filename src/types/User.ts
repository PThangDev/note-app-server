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

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  account: string;
  password: string;
}

export interface RequestAuth extends Request {
  user?: User;
}
