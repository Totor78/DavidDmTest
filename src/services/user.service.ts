import KcAdminClient from 'keycloak-admin';
import {KeycloakAdminClient} from 'keycloak-admin/lib/client';

export interface IUserService {
    getUsers(authorization: string): Promise<any>;
    getUserByName(authorization: string, name: string): Promise<any>;
}

export class UserService implements IUserService {

    private kcAdminClient: KcAdminClient;

    constructor() {
        this.kcAdminClient = new KeycloakAdminClient();
        this.kcAdminClient.setConfig({
            baseUrl: 'http://keycloak.erzo.wtf/auth',
            realmName: 'master',
        });
    }

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
