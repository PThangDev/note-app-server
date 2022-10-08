import express from 'express';

import { topicController } from '../controllers';
import { authMiddleware, validateMiddleware } from '../middlewares';
import { createTopicSchema, updateTopicSchema } from '../schema';

const topicRouter = express.Router();

// Get topics
topicRouter.get('/', authMiddleware(), topicController.getTopics);
// Get topic detail
topicRouter.get('/:id', authMiddleware(), topicController.getTopic);
// Create new topic
topicRouter.post(
  '/',
  authMiddleware(),
  validateMiddleware(createTopicSchema),
  topicController.createTopic
);
// Update topic
topicRouter.put(
  '/:id',
  authMiddleware(),
  validateMiddleware(updateTopicSchema),
  topicController.updateTopic
);
// Delete topic
topicRouter.delete('/:id', authMiddleware(), topicController.deleteTopic);
// Delete topics
topicRouter.delete('/', authMiddleware(), topicController.deleteTopics);

export default topicRouter;
