import { Router } from 'express';
import authRouter from './api/auth/auth.routes';
import teamsRouter from './api/teams/teams.routes';
import marketRouter from './api/market/market.routes';

const router = Router();
router.use('/api/auth', authRouter);
router.use('/api/teams', teamsRouter);
router.use('/api/market', marketRouter);

export default router;