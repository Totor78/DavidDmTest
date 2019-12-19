import {KeycloakAdminClient} from 'keycloak-admin/lib/client';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';

export interface IUserIAMService {
    getUsers(token: string): Promise<any>;
    getUserByName(token: string, name: string): Promise<any>;
    getUserById(token: string, id: v4String): Promise<any>;
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
    public async getUsers(token: string): Promise<any> {
        try {
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.find();
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserByName(token: string, name: string): Promise<any> {
        try {
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.find({
                username: name,
            });
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserById(token: string, id: v4String): Promise<any> {
        try {
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.findOne({
                id: id.toString(),
            });
        } catch (e) {
            return e;
        }
    }
}
