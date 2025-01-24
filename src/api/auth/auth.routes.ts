import express from 'express';
import { promisify } from 'util'
import { authenticate } from './auth.services';
import { validateInputs } from '../../middlewares/auth';

const authRouter = express.Router();

authRouter.post('/', validateInputs, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const regenerateAsync = promisify(req.session.regenerate).bind(req.session);
        const saveAsync = promisify(req.session.save).bind(req.session);

        await regenerateAsync();

        const authenticatedUser = await authenticate(email, password);
        req.session.user = authenticatedUser;

        await saveAsync();
        res.json({ success: true, user: authenticatedUser });
    } catch (error) {
        next(error);
    }
});

export default authRouter