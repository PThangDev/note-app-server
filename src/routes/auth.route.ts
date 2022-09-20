import express from 'express';
import { authController } from '../controllers';
import { loginSchema } from '../dto';
import { authMiddleware, validateMiddleware } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', validateMiddleware(loginSchema), authController.login);
authRouter.post('/forgot-password', authController.forgotPassword);

authRouter.put('/active-account', authController.activeAccount);
authRouter.put('/change-password', authMiddleware, authController.changePassword);

authRouter.get('/info-account', authMiddleware, authController.getInfoUser);

export default authRouter;
