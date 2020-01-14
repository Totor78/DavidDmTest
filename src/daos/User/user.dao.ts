import {v4String} from 'uuid/interfaces';
import {NameCallerArgsReturnLogDaosInfoLevel, SequelizeConnection} from '@shared';
import {IUser, User} from '@entities';
import {Subscription} from '@entities';
import {IMedia, MediaEntity} from '../../entities/media.entity';
export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getOne: (id: v4String) => Promise<IUser|null>;
    add: (user: IUser) => Promise<any>;
    patch: (media: IMedia, userId: v4String) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: v4String) => Promise<void>;
    getFollowersOfUser: (id: v4String) => Promise<any>;
    getFollowsOfUser: (id: v4String) => Promise<any>;
}

export class UserDao implements IUserDao {
    private userRepository = SequelizeConnection.getInstance().getRepository(User);
    private subscriptionRepository = SequelizeConnection.getInstance().getRepository(Subscription);
    private mediaRepository = SequelizeConnection.getInstance().getRepository(MediaEntity);

    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }
    /**
     * @param id of the user to return
     * @param userIAM
     */
    public async getOne(id: v4String): Promise<IUser|null> {
        return this.userRepository.findOne({
            where: {
                id: id.toString(),
            },
            include: [
                this.mediaRepository,
            ],
        });
    }
    /**
     * @param id
     */
    public async getFollowersOfUser(id: v4String): Promise<any> {
         return this.userRepository.findAll({
            include: [{
                model: this.subscriptionRepository,
                as: 'followers',
                where: {
                    followedId: id.toString(),
                },
            },
                this.mediaRepository,
            ],
        });
    }
    /**
     * @param id
     */
    public async getFollowsOfUser(id: v4String): Promise<any> {
        return this.userRepository.findAll({
            include: [{
                model: this.subscriptionRepository,
                as: 'follows',
                where: {
                    followerId: id.toString(),
                },
            },
                this.mediaRepository,
            ],
        });
    }
    public async add(user: IUser): Promise<any> {
        user.media !== undefined ? user.mediaId = user.media.id : user.mediaId = undefined;
        return this.userRepository.create(user, {
            include: [
                this.mediaRepository,
            ],
        });
    }

    @NameCallerArgsReturnLogDaosInfoLevel('User')
    public async patch(media: IMedia, userId: v4String): Promise<any> {
        const userInBase = await this.getOne(userId);
        if (userInBase !== null) {
            if (userInBase.mediaId !== undefined) {
                return this.mediaRepository.destroy({
                    where: {
                        userId: userInBase.id.toString(),
                    },
                });
            }
            userInBase.media = media;
            userInBase.mediaId = media.id;
            await this.userRepository.update(userInBase, {
                where: {
                    id: userInBase.id.toString(),
                },
            });
            media.userId = userInBase.id;
            return this.mediaRepository.create(media);
        } else {
            const user: IUser = {id: userId} as IUser;
            await this.add({id: userId} as IUser);
            media.userId = userId;
            await this.mediaRepository.create(media);
            user.media = media;
            user.mediaId = media.id;
            return this.userRepository.update(user, {
                where: {
                    id: userId.toString(),
                },
            });
        }
    }

    /**
     *
     * @param user to update
     */
    public async update(user: IUser): Promise<any> {
        await this.userRepository.update(user, {
            where: {
                id: user.id.toString(),
            },
        });
    }

    /**
     *
     * @param id
     */
    public async delete(id: v4String): Promise<any> {
        const userInBase = await this.getOne(id);
        if (userInBase !== null && userInBase.mediaId !== undefined) {
            await this.mediaRepository.destroy({
                where: {
                    userId: id.toString(),
                },
            });
        }
        return this.userRepository.destroy({
            where: {
                id: id.toString(),
            },
        });
    }
}
