import {IUser, IUserIAM, UserIAM} from '@entities';
import {v4String} from 'uuid/interfaces';
import {UserDao} from '@daos';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {IUserDao} from '../daos/User/user.dao';
import {IMedia} from '../entities/media.entity';

export interface IUserService {
    getAll: () => Promise<IUser[]>;
    getUserById: (id: v4String) => Promise<IUser|null>;
    getFollowersOfUser: (id: v4String) => Promise<IUser[]>;
    getFollowsOfUser: (id: v4String) => Promise<IUser[]>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    patch: (media: IMedia, userId: v4String) => Promise<any>;
    delete: (id: v4String) => Promise<any>;
}

export class UserService implements IUserService {

    private userDao: IUserDao = new UserDao();

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async add(user: IUser): Promise<any> {
        return this.userDao.add(user);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async delete(id: v4String): Promise<any> {
        return this.userDao.delete(id);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async getAll(): Promise<IUser[]> {
        return this.userDao.getAll();
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async getUserById(id: v4String): Promise<IUser|null> {
        return await this.userDao.getOne(id);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async getFollowersOfUser(id: v4String): Promise<IUser[]> {
        return this.userDao.getFollowersOfUser(id);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async getFollowsOfUser(id: v4String): Promise<IUser[]> {
        return this.userDao.getFollowsOfUser(id);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async patch(media: IMedia, userId: v4String): Promise<any> {
        return this.userDao.patch(media, userId);
    }

    @NameCallerArgsReturnLogServicesInfoLevel('User')
    public async update(user: IUser): Promise<any> {
        return this.userDao.update(user);
    }
}
