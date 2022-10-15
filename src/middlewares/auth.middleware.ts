import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { AuthModel } from '../models';
import { DecodedToken, RequestAuth, StatusUser } from '../types';

const authMiddleware =
  (decodeTokenSecret: string = `${process.env.ACCESS_TOKEN_SECRET}`) =>
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.header('Authorization');

      const token = bearerToken?.split(' ')[1];

      if (!token) throw createHttpError(401, 'Unauthorization!');

      // Verify Token
      const decodedToken = <DecodedToken>jwt.verify(token, decodeTokenSecret);

      if (!decodedToken) throw createHttpError(401, 'Unauthorization!');

      const user = await AuthModel.findOne({ _id: decodedToken._id });

      if (!user) throw createHttpError(401, 'User does not exists');

      if (user.status === StatusUser.banned)
        throw createHttpError(401, 'Your account has been banned!');

      req.user = user._doc;

      next();
    } catch (error) {
      next(error);
    }
  };
export default authMiddleware;
