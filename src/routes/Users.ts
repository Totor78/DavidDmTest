import { UserDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';
import {} from 'jwt-decode';
import {getusers} from '../services/user';
import jwt_decode from 'jwt-decode';
import {kStringMaxLength} from 'buffer';
// Init shared
const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('', async (req: Request, res: Response) => {
    try {
        // tslint:disable-next-line:no-console
        const users = await userDao.getAll();
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get Followers by  Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/followers/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await userDao.getFollowerByUser( id );
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});
/******************************************************************************
 *                      Get Followed by  Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/follows/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await userDao.getFollowsByUser( id );
        return res.status(OK).json({users});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});
/******************************************************************************
 *                      Get one UserIAM - "GET /api/users/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    const token = authorization !== undefined; //? jwt_decode(authorization.split(' ')[1]) : '';
    try {
        if (authorization != null) {
            const kcusers = await getusers(authorization);
            logger.info(kcusers);
        }
        const { id } = req.params;
        const users = await userDao.getOne(id);
        const str = res.status(OK).json({users});
        return str;
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
    try {

        const user  = req.body;
        await userDao.add(user);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});
/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('', async (req: Request, res: Response) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        user.id = Number(user.id);
        await userDao.update(user);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;
        await userDao.delete(Number(id));
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
