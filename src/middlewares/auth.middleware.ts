import { NextFunction, Response } from 'express';
import createErrors from 'http-errors';
import jwt from 'jsonwebtoken';

import { AuthModel } from '../models';
import { DecodedToken, RequestAuth } from '../types';

const authMiddleware = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('Authorization');

    const token = bearerToken?.split(' ')[1];

    if (!token) throw createErrors(401, 'Unauthorization!');

    const decodedToken = <DecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);

    if (!decodedToken) throw createErrors(401, 'Unauthorization!');

    const user = await AuthModel.findOne({ _id: decodedToken._id });

    if (!user) throw createErrors(401, 'User does not exists');

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;
