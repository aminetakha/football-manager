import { Router } from 'express';
import authRouter from './api/auth/auth.routes';
import teamsRouter from './api/teams/teams.routes';
import marketRouter from './api/market/market.routes';
import { isAuthenticated } from './middlewares/auth';

const router = Router();
router.use('/api/auth', authRouter);
router.use('/api/teams', isAuthenticated, teamsRouter);
router.use('/api/market', isAuthenticated, marketRouter);

export default router;