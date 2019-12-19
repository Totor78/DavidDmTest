import {IUser, eTheme} from './user.entity';
import {IUserIAM} from './userIAM.entity';
import {v4String} from 'uuid/interfaces';
import {ISubscription} from './subscription.entity';

export default interface IUserMerge extends IUserIAM, IUser {
}

export class UserMerge implements IUserMerge {
    public dateOfBirth!: Date;
    public description!: string;
    public email!: string;
    public firstName!: string;
    public followers!: ISubscription[];
    public follows!: ISubscription[];
    public id!: v4String;
    public lastName!: string;
    public pictureId!: v4String;
    public theme!: eTheme;
    public username!: string;

    constructor(user: IUser, userIAM: IUserIAM) {
        this.dateOfBirth = user.dateOfBirth;
        this.description = user.description;
        this.followers = user.followers;
        this.follows = user.follows;
        this.pictureId = user.pictureId;
        this.theme = user.theme;

        this.email = userIAM.email;
        this.firstName = userIAM.firstName;
        this.lastName = userIAM.lastName;
        this.username = userIAM.username;
    }
}
