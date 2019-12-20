import {ISubscription, IUser} from '@entities';
import {SubscriptionDao} from '@daos';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {ISubscriptionDao} from '../daos/Subscription/subscription.dao';
import {v4String} from 'uuid/interfaces';
import {IUserService, UserService} from './user.service';

export interface ISubscriptionService {
    getAll: () => Promise<ISubscription[]>;
    add: (followerId: v4String, followedId: v4String) => Promise<any>;
    delete: (followerId: v4String, followedId: v4String) => Promise<any>;
}

export class SubscriptionService implements ISubscriptionService {

    private userService: IUserService = new UserService();

    private subscriptionDao: ISubscriptionDao = new SubscriptionDao();

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async add(followerId: v4String, followedId: v4String): Promise<any> {
        const userFollower = await this.userService.getUserById(followerId);
        if (userFollower === null) {
            await this.userService.add({id: followerId} as IUser);
        }
        const userFollowed = await this.userService.getUserById(followedId);
        if (userFollowed === null) {
            await this.userService.add({id: followedId} as IUser);
        }
        return this.subscriptionDao.add(followerId, followedId);
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
