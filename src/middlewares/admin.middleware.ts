import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { RequestAuth, RoleUser } from '../types';

const adminMiddleware = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const user = req?.user;
    if (user?.role === RoleUser.admin) {
      next();
    } else {
      throw createHttpError(401, 'Access denied. Account does not has access permission');
    }
  } catch (error) {
    next(error);
  }
};
export default adminMiddleware;
