import {v4String} from 'uuid/interfaces';
import {NameCallerArgsReturnLogDaosInfoLevel, SequelizeConnection} from '@shared';
import {ISubscription, Subscription} from '@entities';

export interface ISubscriptionDao {
    getAll: () => Promise<ISubscription[]>;
    add: (followerId: v4String, followedId: v4String) => Promise<any>;
    delete: (followerId: v4String, followedId: v4String) => Promise<void>;
}

export class SubscriptionDao implements ISubscriptionDao {
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(Subscription);

    @NameCallerArgsReturnLogDaosInfoLevel('Subscription')
    public async getAll(): Promise<ISubscription[]> {
        return this.subscriptionRepository.findAll();
    }

    @NameCallerArgsReturnLogDaosInfoLevel('Subscription')
    public async add(followerId: v4String, followedId: v4String): Promise<any> {
        return this.subscriptionRepository.create({
            followerId,
            followedId,
        });
    }

    /**
     *
     * @param followerId
     * @param followedId
     */
    @NameCallerArgsReturnLogDaosInfoLevel('Subscription')
    public async delete(followerId: v4String, followedId: v4String): Promise<any> {

        return this.subscriptionRepository.destroy({
            where: {
                followerId: String(followerId),
                followedId: String(followedId),
            },
        });
    }
}
