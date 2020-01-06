import IUserMerge, {UserMerge} from '../entities/userMerge.entity';
import {IUserService, UserService} from './user.service';
import {IUserIAMService, UserIAMService} from './userIAM.service';
import {IUser, IUserIAM, UserIAM} from '@entities';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import jwt_decode from 'jwt-decode';
import {getIdFromAuthorization} from '../shared/Utils';

export interface IUserMergeService {
    getAll(): Promise<IUserMerge[]>;
    searchUsersByName(name: string): Promise<IUserMerge[]>;
    getFollowsOfUser(authorization: string): Promise<IUserMerge[]>;
    getFollowersOfUser(authorization: string): Promise<IUserMerge[]>;
}

export class UserMergeService implements IUserMergeService {

    private userService: IUserService = new UserService();
    private userIAMService: IUserIAMService = new UserIAMService();

    @NameCallerArgsReturnLogServicesInfoLevel('UserMerge')
    public async getAll(): Promise<IUserMerge[]> {
        return UserMergeService.getUsersMergeFromUsersAndUsersIAM(
            await this.userService.getAll(),
            await this.userIAMService.getUsers(),
        );
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserMerge')
    public async searchUsersByName(name: string): Promise<IUserMerge[]> {
        return UserMergeService.getUsersMergeFromUsersAndUsersIAM(
            await this.userService.getAll(),
            await this.userIAMService.searchUsersByName(name),
        );
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserMerge')
    public async getFollowsOfUser(authorization: string): Promise<IUserMerge[]> {
        const id = getIdFromAuthorization(authorization);
        return UserMergeService.getUsersMergeFromUsersAndUsersIAM(
            await this.userService.getFollowsOfUser(id),
            await this.userIAMService.getUsers(),
            true,
        );
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserMerge')
    public async getFollowersOfUser(authorization: string): Promise<IUserMerge[]> {
        const id = getIdFromAuthorization(authorization);
        return UserMergeService.getUsersMergeFromUsersAndUsersIAM(
            await this.userService.getFollowersOfUser(id),
            await this.userIAMService.getUsers(),
            true,
        );
    }

    private static getUsersMergeFromUsersAndUsersIAM(
        users: IUser[],
        usersIAM: IUserIAM[],
        strict: boolean = false,
    ): IUserMerge[] {
        const usersMerge: IUserMerge[] = [];
        for (const usersIAMElement of usersIAM) {
            let isIn: boolean = false;
            if (users.length > 0) {
                for (const user of users) {
                    if (user.id === usersIAMElement.id) {
                        isIn = true;
                        usersMerge.push(new UserMerge(user, usersIAMElement));
                    }
                }
            }
            if (!isIn && !strict) {
                usersMerge.push(new UserMerge({id: usersIAMElement.id} as IUser, usersIAMElement));
            }
        }
        return usersMerge;
    }
}
