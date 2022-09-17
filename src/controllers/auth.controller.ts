import { NextFunction, Request, Response } from 'express';
import { authService } from '../services';

// [POST] login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { account, password } = req.body;

    const response = await authService.login({ account, password });

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
// [POST] register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.register(req.body);

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// [PUT] active account
export const activeAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { active_token } = req.body;

    const response = await authService.activeAccount(active_token);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
