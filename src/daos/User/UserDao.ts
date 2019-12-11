import {v4String} from 'uuid/interfaces';
import {SequelizeConnection} from '@shared';
import {IUser, User} from '@entities';
import {ISubscription, Subscription} from '@entities';

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
    private userRepository = SequelizeConnection.getInstance().getRepository(User);
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(Subscription);
    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }
    /**
     * @param id of the user to return
     */
    public async getOne(id: v4String): Promise<IUser|null> {
        return this.userRepository.findOne({ where: {id: String(id) }});
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
