import { Express } from 'express';

import authRouter from './auth.route';
import noteRouter from './note.route';

const routes = (app: Express) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/notes', noteRouter);
};

export default routes;
