import {KeycloakAdminClient} from 'keycloak-admin/lib/client';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';
import {IUserIAM, UserIAM} from '@entities';

export interface IUserIAMService {
    getUsers(token: string): Promise<UserIAM[]>;
    searchUsersByName(token: string, name: string): Promise<UserIAM[]>;
    getUserById(token: string, id: v4String): Promise<UserIAM>;
}

export class UserIAMService implements IUserIAMService {

    private kcAdminClient: KeycloakAdminClient;

    constructor() {
        this.kcAdminClient = new KeycloakAdminClient();
        this.kcAdminClient.setConfig({
            baseUrl: process.env.KEYCLOAK_BASE_URL,
            realmName: process.env.KEYCLOAK_REALM_NAME,
        });
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUsers(token: string): Promise<UserIAM[]> {
        try {
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.find() as unknown as IUserIAM[];
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async searchUsersByName(token: string, name: string): Promise<UserIAM[]> {
        try {
            this.kcAdminClient.setAccessToken(token);
            const users = await this.kcAdminClient.users.find();
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
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.findOne({
                id: id.toString(),
            }) as unknown as IUserIAM;
        } catch (e) {
            return e;
        }
    }
}
