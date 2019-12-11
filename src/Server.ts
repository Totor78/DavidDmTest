import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import {KeycloakMiddleware} from './shared/Keycloak';
import cors from 'cors';

// Init express
const app = express();
const keycloak = KeycloakMiddleware.getInstance();
// Add middleware/settings/routes to express.
const allowedOrigins = ['http://127.0.0.1:3000/', 'http://localhost:3000/', 'http://erzo.wtf/'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(keycloak.middleware());
app.use('/users', BaseRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
