import { Router } from 'express';
import authRouter from './api/auth/auth.routes';

const router = Router();
router.use('/api/auth', authRouter);

export default router;