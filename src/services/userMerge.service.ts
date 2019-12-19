import IUserMerge, {UserMerge} from '../entities/userMerge.entity';
import {IUserService, UserService} from './user.service';
import {IUserIAMService, UserIAMService} from './userIAM.service';
import {IUser, IUserIAM, UserIAM} from '@entities';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';

export interface IUserMergeService {
    getAll(authorization: string): Promise<IUserMerge[]>;
}

export class UserMergeService implements IUserMergeService {

    private userService: IUserService = new UserService();
    private userIAMService: IUserIAMService = new UserIAMService();

    @NameCallerArgsReturnLogServicesInfoLevel('UserMerge')
    public async getAll(authorization: string): Promise<IUserMerge[]> {
        const token: string = authorization !== undefined ? authorization.split(' ')[1] : '';
        return this.getUsersMergeFromUsersAndUsersIAM(
            await this.userService.getAll(),
            await this.userIAMService.getUsers(token),
        );
    }

    private getUsersMergeFromUsersAndUsersIAM(users: IUser[], usersIAM: IUserIAM[]): IUserMerge[] {
        const usersMerge: IUserMerge[] = [];
        if (users.length === 0 || usersIAM.length === 0) {
            return usersMerge;
        }
        users.forEach((user: IUser) => {
            usersIAM.forEach((userIAM: IUserIAM) => {
                if (user.id === userIAM.id) {
                    usersMerge.push(new UserMerge(user, userIAM));
                }
            });
        });

        return usersMerge;
    }
}
