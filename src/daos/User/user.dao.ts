import {v4String} from 'uuid/interfaces';
import {NameCallerArgsReturnLogDaosInfoLevel, SequelizeConnection} from '@shared';
import {IUser, UserEntity} from '@entities';
import {ISubscription, SubscriptionEntity} from '@entities';
export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getOne: (id: v4String) => Promise<IUser|null>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: v4String) => Promise<void>;
    getFollowersOfUser: (id: v4String) => Promise<any>;
    getFollowsOfUser: (id: v4String) => Promise<any>;
}

export class UserDao implements IUserDao {
    private userRepository = SequelizeConnection.getInstance().getRepository(UserEntity);
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(SubscriptionEntity);

    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }
    /**
     * @param id of the user to return
     */
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async getOne(id: v4String): Promise<IUser|null> {
        return this.userRepository.findOne({ where: {id: String(id) }});
    }
    /**
     * @param id
     */
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async getFollowersOfUser(id: v4String): Promise<any> {
         return this.userRepository.findByPk(id.toString(), {
            include: [{
                model: this.subscriptionRepository,
                as: 'followers',
            }],
        });
    }
    /**
     * @param id
     */
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async getFollowsOfUser(id: v4String): Promise<any> {
        return this.subscriptionRepository.findAll({
            where: {
                followerId: id.toString(),
            },
        });
    }
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async add(user: IUser): Promise<any> {
        return this.userRepository.create(user);
    }
    /**
     *
     * @param user to update
     */
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async update(user: IUser): Promise<any> {

        return this.userRepository.update(user, {
            where: {
                id: String(user.id),
            }});
    }

    /**
     *
     * @param id
     */
    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async delete(id: v4String): Promise<any> {

        return this.userRepository.destroy( {
            where: {
                id: String(id),
            },
        });
    }
}
