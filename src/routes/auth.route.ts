import express from 'express';

import { authController } from '../controllers';
import { adminMiddleware, authMiddleware, validateMiddleware } from '../middlewares';
import {
  activeAccountSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from '../schema';

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

// Admin
authRouter.post('/admin/ban-account', authMiddleware, adminMiddleware, authController.banAccount);
authRouter.get('/admin/accounts', authMiddleware, adminMiddleware, authController.getAccounts);

export default authRouter;
