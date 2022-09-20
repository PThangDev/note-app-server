import express from 'express';
import { authController } from '../controllers';
import {
  activeAccountSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from '../dto';
import { authMiddleware, validateMiddleware } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/register', validateMiddleware(registerSchema), authController.register);
authRouter.post('/login', validateMiddleware(loginSchema), authController.login);
authRouter.post(
  '/forgot-password',
  validateMiddleware(forgotPasswordSchema),
  authController.forgotPassword
);

authRouter.put(
  '/active-account',
  validateMiddleware(activeAccountSchema),
  authController.activeAccount
);
authRouter.put(
  '/change-password',
  authMiddleware,
  validateMiddleware(changePasswordSchema),
  authController.changePassword
);

authRouter.get('/info-account', authMiddleware, authController.getInfoUser);

export default authRouter;
