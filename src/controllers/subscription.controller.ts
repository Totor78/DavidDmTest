import {
    ApiOperationDelete,
    ApiOperationGet,
    ApiOperationPost,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {controller, httpDelete, httpGet, httpPost, interfaces} from 'inversify-express-utils';
import {v4String} from 'uuid/interfaces';
import * as express from 'express';
import {ACCEPTED, BAD_REQUEST, CREATED, NOT_FOUND, OK} from 'http-status-codes';
import {globalInfoLogger, NameCallerArgsReturnLogControllersInfoLevel} from '@shared';
import {KeycloakMiddleware} from '../shared/Keycloak';
import {getIdFromAuthorization, idMatch} from '../shared/Utils';
import {ISubscriptionService, SubscriptionService} from '../services/subscription.service';
import jwt_decode from 'jwt-decode';
import {eNotificationType, INotification, NotificationEntity} from '../entities/notification.entity';
import {INotificationService, NotificationService} from '../services/notification.service';

interface ISubscriptionController {
    getAll: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    add: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<any>;
    delete: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<any>;
}

@ApiPath({
    path: '/subscriptions',
    name: 'Subscription',
})
@controller(
    '/subscriptions',
    (process.env.USE_MOCK_DB || '').toLowerCase() !== 'true'
        ? KeycloakMiddleware.getInstance().protect()
        : KeycloakMiddleware.getInstance().middleware(),
)
export class SubscriptionController implements interfaces.Controller, ISubscriptionController {

    private subscriptionService: ISubscriptionService = new SubscriptionService();
    private notificationService: INotificationService = new NotificationService();

    public static TARGET_NAME = 'subscriptionController';

    @httpPost('/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('Subscription')
    @ApiOperationPost({
        description: 'Add a subscription',
        summary: 'Add a new subscription',
        path: '/{id}',
        parameters: {
            path: {
                id: {
                    description: 'id of a user',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    format: 'uuidv4',
                    required: true,
                },
            },
        },
        responses: {
            201: {
                description: 'Created',
            },
            400: {
                description: 'Subscription malformed',
            },
        },
    })
    public async add(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        const { id } = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        const authorization: string = request.headers.authorization as unknown as string;
        const followerId: v4String = getIdFromAuthorization(authorization);
        try {
            this.subscriptionService.add(followerId, id as unknown as v4String).then(() => {
                const notification: INotification = new NotificationEntity(
                    eNotificationType.FOLLOWS,
                    followerId,
                    id as unknown as v4String,
                );
                this.notificationService.add(notification, authorization);
            });
            return response.status(CREATED).json();
        } catch (e) {
            globalInfoLogger.error(e.message, e);
            return response.status(BAD_REQUEST).json({
                message: e.message,
                stack: e.stack,
            });
        }
    }

    @httpDelete('/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('Subscription')
    @ApiOperationDelete({
        description: 'Delete a subscription',
        summary: 'Delete an existing subscription',
        path: '/{id}',
        parameters: {
            path: {
                id: {
                    description: 'id of a user',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    format: 'uuidv4',
                    required: true,
                },
            },
        },
        responses: {
            202: {
                description: 'Deleted',
            },
            400: {
                description: 'Subscription malformed',
            },
            404: {
                description: 'Subscription not found',
            },
        },
    })
    public async delete(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        const { id } = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        const authorization = request.headers.authorization;
        const token = authorization !== undefined ? jwt_decode(authorization.split(' ')[1]) : '';
        // @ts-ignore
        const followerId = token.sub;
        try {
            await this.subscriptionService.delete(followerId as unknown as v4String, id as unknown as v4String);
            return response.status(ACCEPTED).json();
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('')
    @NameCallerArgsReturnLogControllersInfoLevel('Subscription')
    @ApiOperationGet({
        description: 'Get all subscriptions',
        summary: 'Get list of all subscriptions',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'Subscription',
            },
            400: {
                description: 'Bad request',
            },
        },
    })
    public async getAll(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        try {
            const subscriptions = await this.subscriptionService.getAll();
            return response.status(OK).json({subscriptions});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }
}
