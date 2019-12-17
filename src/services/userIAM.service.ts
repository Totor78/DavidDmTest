import KcAdminClient from 'keycloak-admin';
import {KeycloakAdminClient} from 'keycloak-admin/lib/client';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';

export interface IUserIAMService {
    getUsers(authorization: string): Promise<any>;
    getUserByName(authorization: string, name: string): Promise<any>;
}

export class UserIAMService implements IUserIAMService {

    private kcAdminClient: KcAdminClient;

    constructor() {
        this.kcAdminClient = new KeycloakAdminClient();
        this.kcAdminClient.setConfig({
            baseUrl: process.env.KEYCLOAK_BASE_URL,
            realmName: process.env.KEYCLOAK_REALM_NAME,
        });
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUsers(authorization: string): Promise<any> {
        try {
            this.kcAdminClient.setAccessToken(authorization);
            const user = await this.kcAdminClient.users.find({
                username: name,
            });
            return user;
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserByName(authorization: string, name: string): Promise<any> {
        try {
            this.kcAdminClient.setAccessToken(authorization);
            const users = await this.kcAdminClient.users.find();
            return users;
        } catch (e) {
            return e;
        }
    }
}
