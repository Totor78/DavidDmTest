import {IUser} from './User';
import {IUserIAM} from './UserIAM';
import {v4String} from 'uuid/interfaces';
import {Subscription} from './Subscription';
import {Theme} from './Theme';

export default interface IUserMerge extends IUser, IUserIAM {
    Theme: Theme;
    birthday: Date;
    description: string;
    email: string;
    firstName: string;
    followers: Subscription[];
    follows: Subscription[];
    idMerge: v4String | undefined;
    lastName: string;
    picture: string;
    username: string;
}
export class UserMerge implements IUserMerge {
    public Theme: Theme;
    public birthday: Date;
    public description: string;
    public email: string;
    public firstName: string;
    public followers: Subscription[];
    public follows: Subscription[];
    public idMerge: v4String | undefined;
    public lastName: string;
    public picture: string;
    public username: string;
    // tslint:disable-next-line:max-line-length
    constructor(theme: Theme, birthday: Date, description: string, email: string, firstName: string, followers: Subscription[], follows: Subscription[], idMerge: v4String | undefined, lastName: string, picture: string, username: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.Theme = theme;
        this.birthday = birthday;
        this.description = description;
        this.followers = followers;
        this.follows = follows;
        this.idMerge = idMerge;
        this.picture = picture;
    }
}
