import {KeycloakAdminClient} from 'keycloak-admin/lib/client';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import {v4String} from 'uuid/interfaces';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';

export interface IUserIAMService {
    getUsers(token: string): Promise<UserRepresentation[]>;
    searchUsersByName(token: string, name: string): Promise<UserRepresentation[]>;
    getUserById(token: string, id: v4String): Promise<UserRepresentation>;
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
    public async getUsers(token: string): Promise<UserRepresentation[]> {
        try {
            this.kcAdminClient.setAccessToken(token);
            return await this.kcAdminClient.users.find();
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async searchUsersByName(token: string, name: string): Promise<UserRepresentation[]> {
        try {
            this.kcAdminClient.setAccessToken(token);
            const users = await this.kcAdminClient.users.find();
            return users.filter((user) => {
                if (user.username !== undefined) {
                    return user.username.includes(name);
                } else {
                    return false;
                }
            });
        } catch (e) {
            return e;
        }
    }

    @NameCallerArgsReturnLogServicesInfoLevel('UserIAM')
    public async getUserById(token: string, id: v4String): Promise<UserRepresentation> {
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
