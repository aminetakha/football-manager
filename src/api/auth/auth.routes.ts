import express from 'express';
import { promisify } from 'util'
import { authenticate } from './auth.services';
import { ValidationError } from '../../utils/errors';

const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email){
            next(new ValidationError({ message: 'Email is required', statusCode: 400 }));
            return;
        }
        if(!password){
            next(new ValidationError({ message: 'Password is required', statusCode: 400 }));
            return;
        }

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