import {v4String} from 'uuid/interfaces';
import {SequelizeConnection} from '@shared';
import {ISubscription, IUser, Subscription} from '@entities';

export interface ISubscriptionDao {
    getAll: () => Promise<ISubscription[]>;
    getOne: (followerId: v4String, followedId: v4String) => Promise<ISubscription | null>;
    add: (subscription: ISubscription) => Promise<any>;
    update: (subscription: ISubscription) => Promise<any>;
    delete: (followerId: v4String, followedId: v4String) => Promise<void>;
}

export class SubscriptionDao implements ISubscriptionDao {
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(Subscription);

    public async getAll(): Promise<ISubscription[]> {
        return this.subscriptionRepository.findAll();
    }

    public async getOne(followerId: v4String, followedId: v4String): Promise<ISubscription | null> {
        return this.subscriptionRepository.findOne({
            where:
                {
                    followerId: String(followerId),
                    followedId: String(followedId),
                },
        });
    }

    public async add(subscription: ISubscription): Promise<any> {
        return this.subscriptionRepository.create(subscription);
    }

    /**
     *
     * @param subscription
     */
    public async update(subscription: ISubscription): Promise<any> {

        return this.subscriptionRepository.update(subscription, {
            where: {
                followerId: String(subscription.followerId),
                followedId: String(subscription.followedId),
            },
        });
    }

    /**
     *
     * @param followerId
     * @param followedId
     */
    public async delete(followerId: v4String, followedId: v4String): Promise<any> {

        return this.subscriptionRepository.destroy({
            where: {
                followerId: String(followerId),
                followedId: String(followedId),
            },
        });
    }
}
