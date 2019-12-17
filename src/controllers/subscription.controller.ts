import {
    ApiOperationDelete,
    ApiOperationGet, ApiOperationPost,
    ApiOperationPut,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {controller, httpDelete, httpGet, httpPost, httpPut, interfaces} from 'inversify-express-utils';
import {v4String} from 'uuid/interfaces';
import * as express from 'express';
import {ACCEPTED, BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK} from 'http-status-codes';
import {globalInfoLogger, NameCallerArgsReturnLogControllersInfoLevel} from '@shared';
import {KeycloakMiddleware} from '../shared/Keycloak';
import {idMatch} from '../shared/Utils';
import {ISubscription} from '@entities';
import {ISubscriptionService, SubscriptionService} from '../services/subscription.service';
import jwt_decode from "jwt-decode";

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

    public static TARGET_NAME = 'subscriptionController';

    @httpPost('')
    @NameCallerArgsReturnLogControllersInfoLevel('Subscription')
    @ApiOperationPost({
        description: 'Add a subscription',
        summary: 'Add a new subscription',
        parameters: {
            body: {
                description: 'Subscription to add',
                required: true,
                model: 'Subscription',
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
        try {
            const subscription = request.body;
            await this.subscriptionService.add(subscription);
            return response.status(CREATED);
        } catch (e) {
            globalInfoLogger.error(e.message, e);
            return response.status(BAD_REQUEST).json({
                error: e.message,
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
            return response.status(ACCEPTED);
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
