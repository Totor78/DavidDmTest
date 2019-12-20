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
        for (const usersIAMElement of usersIAM) {
            let isIn: boolean = false;
            for (const user of users) {
                if (user.id === usersIAMElement.id) {
                    isIn = true;
                    usersMerge.push(new UserMerge(user, usersIAMElement));
                }
            }
            if (!isIn) {
                usersMerge.push(new UserMerge({id: usersIAMElement.id} as IUser, usersIAMElement));
            }
        }
        return usersMerge;
    }
}
