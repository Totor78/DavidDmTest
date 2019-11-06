import { Router } from 'express';
import UserRouter from './Users';
import SubscriptionRouter from './Subscription';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/subscriptions', SubscriptionRouter);

// Export the base-router
export default router;
