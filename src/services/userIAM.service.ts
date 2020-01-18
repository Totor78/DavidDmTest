import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';
import {IUserIAM, UserIAM} from '@entities';
import {KeycloakAdminClientService} from './keycloakAdminClient.service';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';

export interface IUserIAMService {
    getUsers: () => Promise<UserIAM[]>;
    searchUsersByName: (name: string) => Promise<UserIAM[]>;
    getUserById: (id: v4String) => Promise<UserIAM>;
    getUserByUsername: (username: string) => Promise<any>;
    update: (userIAM: IUserIAM) => Promise<any>;
    getUserRepresentationById: (id: v4String) => Promise<UserRepresentation>;
    updateUserRepresentation: (userRepresentation: UserRepresentation) => Promise<any>;
}

export class UserIAMService implements IUserIAMService {
    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUsers(): Promise<UserIAM[]> {
        try {
            return await KeycloakAdminClientService.getInstance().users.find() as unknown as IUserIAM[];
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async searchUsersByName(name: string): Promise<UserIAM[]> {
        try {
            const users = await KeycloakAdminClientService.getInstance().users.find();
            return users.filter((user) => {
                let contains;
                contains = user.username !== undefined && user.username.toLowerCase().includes(name.toLowerCase());
                if (contains) { return true; }
                contains = user.firstName !== undefined && user.firstName.toLowerCase().includes(name.toLowerCase());
                if (contains) { return true; }
                contains = user.lastName !== undefined && user.lastName.toLowerCase().includes(name.toLowerCase());
                if (contains) { return true; }
                contains =
                    user.lastName !== undefined
                    && user.firstName !== undefined
                    && user.firstName.concat(' ' + user.lastName).toLowerCase().includes(name.toLowerCase());
                return contains;
            }) as unknown as IUserIAM[];
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserById(id: v4String): Promise<UserIAM> {
        try {
            return await KeycloakAdminClientService.getInstance().users.findOne({
                id: id.toString(),
            }) as unknown as IUserIAM;
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserByUsername(username: string): Promise<any> {
        try {
            const users = await KeycloakAdminClientService.getInstance().users.find({
                username,
            });
            if (users.length > 0) {
                return users[0] as unknown as IUserIAM;
            }
            return undefined;
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

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserRepresentationById(id: v4String): Promise<UserRepresentation> {
        try {
            return await KeycloakAdminClientService.getInstance().users.findOne({
                id: id as unknown as string,
            });
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async updateUserRepresentation(userRepresentation: UserRepresentation): Promise<any> {
        try {
            return await KeycloakAdminClientService.getInstance().users.update({
                id: userRepresentation.id as unknown as string,
            }, userRepresentation);
        } catch (e) {
            return e;
        }
    }
}
