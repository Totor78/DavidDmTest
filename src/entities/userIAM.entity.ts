import {v4String} from 'uuid/interfaces';

export interface IUserIAM {
    id?: v4String;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class UserIAMEntity implements IUserIAM {

    public id?: v4String;
    public username: string;
    public firstName: string;
    public lastName: string;
    public email: string;

    constructor(user: IUserIAM) {
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
