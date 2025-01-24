import { Router } from 'express';
import authRouter from './api/auth/auth.routes';
import teamsRouter from './api/teams/teams.routes';

const router = Router();
router.use('/api/auth', authRouter);
router.use('/api/teams', teamsRouter);

export default router;