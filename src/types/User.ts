export type TypeLogin = 'register' | 'google' | 'facebook';
export type RoleUser = 'admin' | 'customer';
export type StatusUser = 'pending' | 'active' | 'banned';

export interface User extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: RoleUser;
  type: TypeLogin;
  status: StatusUser;
  _doc: object;
}
