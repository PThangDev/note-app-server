import { Express } from 'express';
import authRouter from './auth.route';

const routes = (app: Express) => {
  app.use('/api/v1/auth', authRouter);
};

export default routes;
