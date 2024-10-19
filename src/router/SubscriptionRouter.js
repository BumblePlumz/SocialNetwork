import { Router } from 'express';
import { asyncHandler } from './AsyncHandler.js';
import { subscribe, unsubscribe } from '../controllers/SubscriptionController.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/subscribe', asyncHandler( async (req, res) => {
    try {
        const { userID, followerID } = req.body;
        await subscribe({ userID, followerID });
        res.status(201).json();
    }catch(err){
        throw new SubscriptionError(400, err.message);
    }
}));

subscriptionRouter.delete('/unsubscribe', asyncHandler( async (req, res) => {
    try {
        const { userID, followerID } = req.body;
        await unsubscribe({ userID, followerID });
        res.status(204).end();
    }catch(err){
        throw new SubscriptionError(400, err.message);
    }
}));

export default subscriptionRouter;