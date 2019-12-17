import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import {KeycloakMiddleware} from './shared/Keycloak';
import cors from 'cors';
import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import container from './shared/Container';
import * as swagger from 'swagger-express-ts';
import * as bodyParser from 'body-parser';
import {globalInfoLogger} from '@shared';

const server = new InversifyExpressServer(container);
server.setConfig((appConfig: any) => {
    appConfig.use( bodyParser.json() );
    const allowedOrigins = ['http://localhost:3001/', 'http://localhost:3000/', 'http://erzo.wtf/'];
    appConfig.use(cors({
        origin: allowedOrigins,
        credentials: true,
    }));
    appConfig.use(KeycloakMiddleware.getInstance().middleware());
    appConfig.use(logger('dev'));
    appConfig.use(express.json());
    appConfig.use(express.urlencoded({extended: true}));
    appConfig.use(cookieParser());
    appConfig.use( '/api-docs/users/swagger' , express.static( 'swagger' ) );
    appConfig.use( '/api-docs/users/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
    appConfig.use( swagger.express(
        {
            definition : {
                info : {
                    title : 'Users micro-service',
                    version : '1.0',
                },
            },
            path: '/api-docs/users/swagger.json',
        },
    ));
});

server.setErrorConfig((appErr: any) => {
    appErr.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction ) => {
        globalInfoLogger.error(err);
        response.status(500).send('Something broke!');
    });
});

const app = server.build();
export default app;
