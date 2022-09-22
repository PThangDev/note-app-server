import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import { authService } from '../services';
import { RequestAuth, User } from '../types';

// [POST] /auth/login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { account, password } = req.body;

    const response = await authService.login({ account, password });

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [POST] /auth/register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [PUT] /auth/active-account
export const activeAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active_token } = req.body;

    const response = await authService.activeAccount(active_token);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [PUT] /auth/change-password
export const changePassword = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const { newPassword, oldPassword } = req.body;

    const response = await authService.changePassword({ user, oldPassword, newPassword });

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [POST] /auth/forgot-password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const response = await authService.forgotPassword(email);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [GET] /auth/info-account
export const getInfoUser = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as User;

    const response = await authService.getInfoUser(user);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [POST]:admin /auth/ban-account
export const banAccount = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const user = req?.user as User;
    const { accountId } = req.body;

    const response = await authService.banAccount(user, accountId);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
