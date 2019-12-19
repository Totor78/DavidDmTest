import {IUser, IUserIAM, UserIAM} from '@entities';
import {v4String} from 'uuid/interfaces';
import {UserDao} from '@daos';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {IUserDao} from '../daos/User/user.dao';
import {UserIAMService} from './userIAM.service';
import IUserMerge, {UserMerge} from '../entities/userMerge.entity';
import {ancestorWhere} from 'tslint';

export interface IUserService {
    getAll: () => Promise<IUser[]>;
    getUserById: (id: v4String, authorization: any) => Promise<IUserMerge|undefined>;
    getFollowersOfUser: (id: v4String) => Promise<IUser[]>;
    getFollowsOfUser: (id: v4String) => Promise<IUser[]>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: v4String) => Promise<any>;
}

export class UserService implements IUserService {

    private userDao: IUserDao = new UserDao();
    private userIAMService = new UserIAMService();

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
    public async getUserById(id: v4String, authorization: any): Promise<IUserMerge|undefined> {
        const token: string = authorization !== undefined ? authorization.split(' ')[1] : '';
        const userIAM: IUserIAM = UserIAM.instantiateFromUserRepresentation(
            await this.userIAMService.getUserById(token, id),
        );
        const user: IUser|null = await this.userDao.getOne(id);
        if (user !== null) {
            return new UserMerge(user, userIAM);
        }
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
    public async update(user: IUser): Promise<any> {
        return this.userDao.update(user);
    }
}
