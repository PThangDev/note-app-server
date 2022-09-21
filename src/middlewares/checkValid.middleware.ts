import { NextFunction, Response } from 'express';
import { TopicModel } from '../models';
import { RequestAuth } from '../types';

export const validTopicsMiddleware = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topics: topicIds } = req.body;
    const user = req?.user;

    if (topicIds) {
      const topics = await TopicModel.find({ user: user?._id, _id: topicIds });
      const topicIdValids = topics.map((topic) => topic._id);

      req.body = { ...req.body, topics: topicIdValids };
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
