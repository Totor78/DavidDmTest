import {v4String} from 'uuid/interfaces';
import {SequelizeConnection} from '@shared';
import {IUser, UserEntity} from '@entities';
import {UserIAMEntity} from '@entities';
import {ISubscription, SubscriptionEntity} from '@entities';
import IUserMerge, {UserMerge} from '../../entities/UserMerge';
export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getOne: (id: v4String) => Promise<IUser|null>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: v4String) => Promise<void>;
    getFollowerByUser: (id: v4String) => Promise<any>;
    getFollowsByUser: (id: v4String) => Promise<any>;
}

export class UserDao implements IUserDao {
    private userRepository = SequelizeConnection.getInstance().getRepository(UserEntity);
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(SubscriptionEntity);
    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }
    /**
     * @param id of the user to return
     */
    public async getOne(id: v4String, userIAM: UserIAMEntity): Promise<IUserMerge|null> {
        const userEntity = new UserEntity(this.userRepository.findOne({ where: {id: String(id) }}));
        const userIAMEntity = new UserIAMEntity(userIAM);
        const merge = {...userIAMEntity, ...userEntity};
        return new UserMerge(merge);
    }
    /**
     * @param id
     */
    public async getFollowerByUser(id: v4String): Promise<any> {
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
    public async getFollowsByUser(id: v4String): Promise<any> {
        return this.userRepository.findByPk(id.toString(), {
            include: [{
                model: this.subscriptionRepository,
                as: 'follows',
            }],
        });
    }
    public async add(user: IUser): Promise<any> {
        return this.userRepository.create(user);
    }
    /**
     *
     * @param user to update
     */
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
    public async delete(id: v4String): Promise<any> {

        return this.userRepository.destroy( {
            where: {
                id: String(id),
            },
        });
    }
}
