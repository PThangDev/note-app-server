import express from 'express';

import { authController } from '../controllers';
import { adminMiddleware, authMiddleware, validateMiddleware } from '../middlewares';
import {
  activeAccountSchema,
  resetPasswordSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from '../schema';

const authRouter = express.Router();
const RESET_PASSWORD_TOKEN_SECRET = process.env.RESET_PASSWORD_TOKEN_SECRET || '';

authRouter.post('/register', validateMiddleware(registerSchema), authController.register);
authRouter.post('/login', validateMiddleware(loginSchema), authController.login);
authRouter.post('/google-login', authController.loginByGoogle);
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

authRouter.put(
  '/reset-password',
  authMiddleware(RESET_PASSWORD_TOKEN_SECRET),
  validateMiddleware(resetPasswordSchema),
  authController.resetPassword
);

authRouter.get('/info-account', authMiddleware, authController.getInfoUser);

// Admin
authRouter.post('/admin/ban-account', authMiddleware, adminMiddleware, authController.banAccount);
authRouter.get('/admin/accounts', authMiddleware, adminMiddleware, authController.getAccounts);

export default authRouter;
