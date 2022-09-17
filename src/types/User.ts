export type TypeLogin = 'register' | 'google' | 'facebook';
export type RoleUser = 'admin' | 'customer';
export type StatusUser = 'pending' | 'active' | 'banned';

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
  _doc: object;
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
