
import { SubscriptionDao } from '@daos';
import { globalInfoLogger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@shared';
import { ParamsDictionary } from 'express-serve-static-core';

// Init shared
const router = Router();
const subdao = new SubscriptionDao();

/******************************************************************************
 *                      Get All SUBS - "GET /api/subscription/all"
 ******************************************************************************/

router.get('', async (req: Request, res: Response) => {
    try {
        const subscriptions = await subdao.getAll();
        return res.status(OK).json({subscriptions});
    } catch (err) {
        globalInfoLogger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get one SUB - "GET /api/subscription/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { followerId } = req.params;
        const { followedId } = req.params;
        const subs = await subdao.getOne(followerId, followedId);
        return res.status(OK).json({subs});
    } catch (err) {
        globalInfoLogger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/sub/add"
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
    try {

        const sub  = req.body;
        await subdao.add(sub);
        return res.status(CREATED).end();
    } catch (err) {
        globalInfoLogger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});
/******************************************************************************
 *                       Update - "PUT /api/sub/update"
 ******************************************************************************/

router.put('', async (req: Request, res: Response) => {
    try {
        const { sub } = req.body;
        if (!sub) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        }
        sub.id = Number(sub.id);
        await subdao.update(sub);
        return res.status(OK).end();
    } catch (err) {
        globalInfoLogger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/subs/delete/:id"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params as ParamsDictionary;
        await subdao.delete(Number(id));
        return res.status(OK).end();
    } catch (err) {
        globalInfoLogger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
