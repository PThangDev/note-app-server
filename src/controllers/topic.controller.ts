import { NextFunction, Response } from 'express';

import { topicService } from '../services';
import { RequestAuth } from '../types';

// [GET] /topics
export const getTopics = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.getTopics(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [GET] /topics/:id
export const getTopic = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.getTopic(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [POST] /topics
export const createTopic = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.createTopic(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [PUT] /topics/:id
export const updateTopic = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.updateTopic(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [DELETE] /topics/:id
export const deleteTopic = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.deleteTopic(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
// [DELETE] /topics
export const deleteTopics = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const response = await topicService.deleteTopics(req);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
