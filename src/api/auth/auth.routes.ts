import express from 'express';
import { promisify } from 'util'
import { authenticate, getCurrentUserData } from './auth.services';
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

authRouter.get('/me', async (req, res, next) => {
    try {
        const user = req.session.user;
        if(user){
            const currentUser = await getCurrentUserData(user?.id);
            if(!currentUser){
                res.status(401).json({ message: 'Not authorized' });
                return;
            }
            res.status(200).json({ user: currentUser });
            return;
        }
        res.status(401).json({ message: 'Not authorized' })
    } catch (error) {
        next(error);
    }
});

authRouter.post('/logout', async (req, res, next) => {
    try {
        req.session.user = undefined;
        const regenerateAsync = promisify(req.session.regenerate).bind(req.session);
        const saveAsync = promisify(req.session.save).bind(req.session);

        await saveAsync();
        await regenerateAsync();
        res.status(200).json({ success: true })
    } catch (error) {
        next(error)
    }
})

export default authRouter