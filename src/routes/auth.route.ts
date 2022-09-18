import express from 'express';
import { authController } from '../controllers';
import { authMiddleware } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/forgot-password', authController.forgotPassword);

authRouter.put('/active-account', authController.activeAccount);
authRouter.put('/change-password', authMiddleware, authController.changePassword);

export default authRouter;
