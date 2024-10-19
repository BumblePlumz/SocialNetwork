import { Router } from 'express';
import { asyncHandler } from './AsyncHandler.js';
import { register, login, logout } from '../controllers/AuthController.js';
import { AuthError } from '../classes/AuthError.js';

const authRouter = Router();

authRouter.post('/register', asyncHandler( async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new AuthError(400, 'Email and password required');
        await register(email, password);
        res.status(201).json({ message: 'User created' });
    }catch(err){
        throw new AuthError(400, err.message);
    }
}));

authRouter.post('/login', asyncHandler( async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new AuthError(400, 'Email and password required');
        const token = await login(email, password);
        res.status(200).json({ token });
    }catch(err){
        throw new AuthError(400, err.message);
    }
}));

// authRouter.post('/logout', (req, res) => {
//     logout(req, res);
//     res.status(200).json({ message: 'User logged out' });
// });

export default authRouter;