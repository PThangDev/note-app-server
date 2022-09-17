import express from 'express';
import { authController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.put('/active-account', authController.activeAccount);

export default authRouter;
