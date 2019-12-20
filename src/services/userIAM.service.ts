import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';
import {IUserIAM, UserIAM} from '@entities';
import {KeycloakAdminClientService} from './keycloakAdminClient.service';

export interface IUserIAMService {
    getUsers(token: string): Promise<UserIAM[]>;
    searchUsersByName(token: string, name: string): Promise<UserIAM[]>;
    getUserById(token: string, id: v4String): Promise<UserIAM>;
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
                if (user.username !== undefined) {
                    return user.username.includes(name);
                } else {
                    return false;
                }
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
}
