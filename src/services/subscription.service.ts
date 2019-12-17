import {ISubscription} from '@entities';
import {SubscriptionDao} from '@daos';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {ISubscriptionDao} from '../daos/Subscription/subscription.dao';
import {v4String} from 'uuid/interfaces';

export interface ISubscriptionService {
    getAll: () => Promise<ISubscription[]>;
    add: (subscription: ISubscription) => Promise<any>;
    delete: (followerId: v4String, followedId: v4String) => Promise<any>;
}

export class SubscriptionService implements ISubscriptionService {

    private subscriptionDao: ISubscriptionDao = new SubscriptionDao();

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async add(subscription: ISubscription): Promise<any> {
        return this.subscriptionDao.add(subscription);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async delete(followerId: v4String, followedId: v4String): Promise<any> {
        return this.subscriptionDao.delete(followerId, followedId);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async getAll(): Promise<ISubscription[]> {
        return this.subscriptionDao.getAll();
    }
}
