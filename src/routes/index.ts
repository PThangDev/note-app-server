import { Express } from 'express';

import authRouter from './auth.route';
import noteRouter from './note.route';
import topicRouter from './topic.route';

const routes = (app: Express) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/notes', noteRouter);
  app.use('/api/v1/topics', topicRouter);
};

export default routes;
