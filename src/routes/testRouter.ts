import express, { NextFunction, Response } from 'express';
import { authMiddleware } from '../middlewares';
import { NoteModel } from '../models';
import { RequestAuth, User } from '../types';

const testRouter = express.Router();

const testController = async (req: RequestAuth, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    const { topicIds } = req.body;
    const notes = await NoteModel.find({ user: user._id, topics: { $in: topicIds } });

    return res.json({ data: notes });
  } catch (error) {
    console.log(error);
  }
};

testRouter.post('/', authMiddleware(), testController);

export default testRouter;
