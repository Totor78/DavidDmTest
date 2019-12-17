import {IUser, eTheme} from './user.entity';
import {IUserIAM} from './userIAM.entity';
import {v4String} from 'uuid/interfaces';
import {SubscriptionEntity} from './subscription.entity';

export default interface IUserMerge extends IUserIAM, IUser {
    idUser?: v4String;
}

export class UserMerge implements IUserMerge {
    public dateOfBirth!: Date;
    public description!: string;
    public email!: string;
    public firstName!: string;
    public followers!: SubscriptionEntity[];
    public follows!: SubscriptionEntity[];
    public id!: v4String;
    public lastName!: string;
    public pictureId!: v4String;
    public theme!: eTheme;
    public username!: string;
    public idUser?: v4String;
    constructor(userMerge: IUserMerge) {
    this.dateOfBirth = userMerge.dateOfBirth;
    this.description = userMerge.description;
    this.email = userMerge.email;
    this.firstName = userMerge.firstName;
    this.followers = userMerge.followers;
    this.follows = userMerge.follows;
    this.lastName = userMerge.lastName;
    this.pictureId = userMerge.pictureId;
    this.theme = userMerge.theme;
    this.username = userMerge.username;
    this.idUser = userMerge.idUser;
    }
}
