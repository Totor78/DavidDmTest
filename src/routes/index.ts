import { Router } from 'express';
import UserRouter from './Users';
import SubscriptionRouter from './Subscription';
import {KeycloakMiddleware} from '../shared/Keycloak';

// Init router and path
const router = Router();
const keycloak = KeycloakMiddleware.getInstance();
// Add sub-routes
const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
if (usingMockDb === 'true') {
    router.use('', UserRouter);
    router.use('/subscriptions', SubscriptionRouter);
} else {
    router.use('', keycloak.protect(), UserRouter);
    router.use('/subscriptions', keycloak.protect(), SubscriptionRouter);
}

// Export the base-router
export default router;
