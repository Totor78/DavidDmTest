import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';
import {IUserIAM, User, UserIAM} from '@entities';
import {KeycloakAdminClientService} from './keycloakAdminClient.service';

export interface IUserIAMService {
    getUsers: (token: string) => Promise<UserIAM[]>;
    searchUsersByName: (token: string, name: string) => Promise<UserIAM[]>;
    getUserById: (token: string, id: v4String) => Promise<UserIAM>;
    update: (userIAM: IUserIAM) => Promise<any>;
}

export class UserIAMService implements IUserIAMService {
    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUsers(token: string): Promise<UserIAM[]> {
        try {
            return await KeycloakAdminClientService.getInstance().users.find() as unknown as IUserIAM[];
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async searchUsersByName(token: string, name: string): Promise<UserIAM[]> {
        try {
            const users = await KeycloakAdminClientService.getInstance().users.find();
            return users.filter((user) => {
                let contains;
                contains = user.username !== undefined && user.username.toLowerCase().includes(name.toLowerCase());
                if (contains) { return true; }
                contains = user.firstName !== undefined && user.firstName.toLowerCase().includes(name.toLowerCase());
                if (contains) { return true; }
                contains = user.lastName !== undefined && user.lastName.toLowerCase().includes(name.toLowerCase());
                return contains;
            }) as unknown as IUserIAM[];
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserById(token: string, id: v4String): Promise<UserIAM> {
        try {
            return await KeycloakAdminClientService.getInstance().users.findOne({
                id: id.toString(),
            }) as unknown as IUserIAM;
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async update(userIAM: IUserIAM): Promise<any> {
        try {
            return await KeycloakAdminClientService.getInstance().users.update({
                id: userIAM.id.toString(),
            }, UserIAM.getUserRepresentationFromUserIAM(userIAM));
        } catch (e) {
            return e;
        }
    }
}
