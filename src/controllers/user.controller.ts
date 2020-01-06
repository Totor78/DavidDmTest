import {
    ApiOperationDelete,
    ApiOperationGet, ApiOperationPost,
    ApiOperationPut,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {controller, httpDelete, httpGet, httpPost, httpPut, interfaces} from 'inversify-express-utils';
import {v4String} from 'uuid/interfaces';
import {IUserIAMService, UserIAMService} from '../services/userIAM.service';
import * as express from 'express';
import {ACCEPTED, BAD_REQUEST, CONFLICT, CREATED, NO_CONTENT, NOT_FOUND, OK} from 'http-status-codes';
import {globalInfoLogger, NameCallerArgsReturnLogControllersInfoLevel} from '@shared';
import {KeycloakMiddleware} from '../shared/Keycloak';
import {getIdFromAuthorization, idMatch} from '../shared/Utils';
import {IUserService, UserService} from '../services/user.service';
import {IUser} from '@entities';
import {IUserMergeService, UserMergeService} from '../services/userMerge.service';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';
import IUserMerge from '../entities/userMerge.entity';

interface IUserController {
    getAll: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getUserById: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getFollowers: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getFollows: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getFollowersOfUser: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getFollowsOfUser: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getAllUserIAM: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getUserIAMByName: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    update: (
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
    path: '/users',
    name: 'User',
})
@controller(
    '/users',
    (process.env.USE_MOCK_DB || '').toLowerCase() !== 'true'
        ? KeycloakMiddleware.getInstance().protect()
        : KeycloakMiddleware.getInstance().middleware(),
)
export class UserController implements interfaces.Controller, IUserController {

    private userIAMService: IUserIAMService = new UserIAMService();
    private userService: IUserService = new UserService();
    private userMergeService: IUserMergeService = new UserMergeService();

    public static TARGET_NAME = 'userController';

    @httpDelete('/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationDelete({
        description: 'Delete a user',
        summary: 'Delete an existing user',
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
                description: 'Id must be UUID',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async delete(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        const {id} = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        try {
            await this.userService.delete(id as unknown as v4String);
            return response.status(ACCEPTED);
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get all users',
        summary: 'Get list of all users',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'UserMerge',
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
            const users = await this.userMergeService.getAll();
            return response.status(OK).json({users});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    @httpGet('/keycloak')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get all users',
        summary: 'Get list of all users',
        path: '/keycloak',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'UserIAM',
            },
            400: {
                description: 'Bad request',
            },
        },
    })
    public async getAllUserIAM(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        try {
            const keycloakUsers = await this.userIAMService.getUsers();
            return response.status(OK).json({keycloakUsers});
        } catch (e) {
            globalInfoLogger.error(e.message, e);
            return response.status(BAD_REQUEST).json( {
                error: e.message,
            });
        }
    }

    @httpGet('/followers/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get followers of user',
        summary: 'Get all followers of a user',
        path: '/followers/{id}',
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
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            400: {
                description: 'Id must be UUID',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getFollowersOfUser(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        const {id} = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        try {
            const followers = await this.userService.getFollowersOfUser(id as unknown as v4String);
            return response.status(OK).json({followers});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/followers')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get followers of connected user',
        summary: 'Get all followers of the connected user',
        path: '/followers',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getFollowers(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        try {
            const followers = await this.userMergeService.getFollowersOfUser(request.headers.authorization as string);
            return response.status(OK).json({followers});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/follows/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get follows of user',
        summary: 'Get all follows of a user',
        path: '/follows/{id}',
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
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            400: {
                description: 'Id must be UUID',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getFollowsOfUser(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        const {id} = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        try {
            const follows = await this.userService.getFollowsOfUser(id as unknown as v4String);
            return response.status(OK).json({follows});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/follows')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get follows of connected user',
        summary: 'Get all follows of the connected user',
        path: '/follows',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getFollows(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        try {
            const follows = await this.userMergeService.getFollowsOfUser(request.headers.authorization as string);
            return response.status(OK).json({follows});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/me')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get me',
        summary: 'Get user me',
        path: '/me',
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getMe(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        const id: v4String = getIdFromAuthorization(request.headers.authorization as unknown as string);
        try {
            const user = await this.userService.getUserById(id);
            return response.status(OK).json({user});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/:id')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get user by his id',
        summary: 'Get user by his id',
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
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'User',
            },
            400: {
                description: 'Id must be UUID',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getUserById(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        const {id} = request.params;
        if (!idMatch(id)) {
            return response.status(BAD_REQUEST).json({
                error: 'id must be uuid',
            });
        }
        try {
            //merge with keycloak
            const user = await this.userService.getUserById(id as unknown as v4String);
            return response.status(OK).json({user});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpGet('/keycloak/:name')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationGet({
        description: 'Get user keycloak by his name',
        summary: 'Get user keycloak by his name',
        path: '/keycloak/{name}',
        parameters: {
            path: {
                name: {
                    description: 'name of a user',
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    required: true,
                },
            },
        },
        responses: {
            200: {
                description: 'Success',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
                model: 'UserIAM',
            },
            404: {
                description: 'User not found',
            },
        },
    })
    public async getUserIAMByName(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        const {name} = request.params;
        try {
            const users = await this.userMergeService.searchUsersByName(name);
            return response.status(OK).json({users});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }

    @httpPut('')
    @NameCallerArgsReturnLogControllersInfoLevel('User')
    @ApiOperationPut({
        description: 'Edit a user',
        summary: 'Update if user exists else create one',
        parameters: {
            body: {
                description: 'User to update',
                required: true,
                model: 'UserMerge',
            },
        },
        responses: {
            201: {
                description: 'Created',
            },
            204: {
                description: 'Updated',
            },
            400: {
                description: 'User malformed',
            },
            404: {
                description: 'User not found',
            },
            409: {
                description: 'Conflict : user with this email already exists',
            },
        },
    })
    public async update(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ): Promise<express.Response> {
        request.connection.setTimeout(Number(process.env.TIMEOUT) || 10000);
        const user: IUserMerge = request.body as unknown as IUserMerge;
        const id: v4String = getIdFromAuthorization(request.headers.authorization as unknown as string);
        user.id = id;
        try {
            const userRepresentation: UserRepresentation = await this.userIAMService.getUserRepresentationById(id);
            userRepresentation.username = user.username;
            userRepresentation.firstName = user.firstName;
            userRepresentation.lastName = user.lastName;
            userRepresentation.email = user.email;
            const updated = await this.userIAMService.updateUserRepresentation(userRepresentation);
            if (updated.response.status === 409) {
                return response.status(CONFLICT).json({
                    error: updated.response.data.errorMessage,
                });
            }
        } catch (err) {
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
        try {
            const findedUser: IUser | null = await this.userService.getUserById(id);
            if (findedUser !== null) {
                try {
                    await this.userService.update(user);
                    return response.status(NO_CONTENT).json();
                } catch (err) {
                    globalInfoLogger.error(err.message, err);
                    return response.status(BAD_REQUEST).json({
                        error: err.message,
                    });
                }
            } else {
                try {
                    await this.userService.add(user);
                    return response.status(CREATED).json();
                } catch (err) {
                    globalInfoLogger.error(err.message, err);
                    return response.status(BAD_REQUEST).json({
                        error: err.message,
                    });
                }
            }
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return response.status(NOT_FOUND).json({
                error: err.message,
            });
        }
    }
}
