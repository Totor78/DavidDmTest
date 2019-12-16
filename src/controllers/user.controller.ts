import {
    ApiOperationDelete,
    ApiOperationGet, ApiOperationPost,
    ApiOperationPut,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import {controller, httpDelete, httpGet, httpPost, httpPut, interfaces} from 'inversify-express-utils';
import {v4String} from 'uuid/interfaces';
import {IUserService, UserService} from '../services/user.service';
import * as express from 'express';
import {ACCEPTED, BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK} from 'http-status-codes';
import {globalInfoLogger, NameCallerArgsReturnLogControllersInfoLevel} from '@shared';
import {KeycloakMiddleware} from '../shared/Keycloak';
import {idMatch} from '../shared/Utils';
import {NextFunction} from 'express';

interface IUserController {
    getAll: (
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
    getUserIAMById: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    getUserIAMByName: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<express.Response>;
    add: (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => Promise<any>;
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
    path: '/posts',
    name: 'Post',
})
@controller(
    '/posts',
    (process.env.USE_MOCK_DB || '').toLowerCase() !== 'true'
        ? KeycloakMiddleware.getInstance().protect()
        : KeycloakMiddleware.getInstance().middleware(),
)
export class UserController implements interfaces.Controller {

    private userService: IUserService = new UserService();

    public static TARGET_NAME = 'userService';
    /*
    public async add(request: Request, response: Response, next: NextFunction): Promise<any> {

    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<any> {

    }

    public async getAll(request: Request, response: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await userDao.getAll();
            return res.status(OK).json({users});
        } catch (err) {
            globalInfoLogger.error(err.message, err);
            return res.status(BAD_REQUEST).json({
                error: err.message,
            });
        }
    }

    public async getAllUserIAM(request: Request, response: Response, next: NextFunction): Promise<Response> {

    }

    public async getFollowersOfUser(request: Request, response: Response, next: NextFunction): Promise<Response> {

    }

    public async getFollowsOfUser(request: Request, response: Response, next: NextFunction): Promise<Response> {

    }

    public async getUserIAMById(request: Request, response: Response, next: NextFunction): Promise<Response> {

    }

    public async getUserIAMByName(request: Request, response: Response, next: NextFunction): Promise<Response> {

    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<any> {

    }
     */
}
