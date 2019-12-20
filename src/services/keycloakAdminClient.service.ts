import {KeycloakAdminClient} from 'keycloak-admin/lib/client';
import {Client, Issuer, TokenSet} from 'openid-client';

export class KeycloakAdminClientService {
    private static kcAdminClient: KeycloakAdminClient;
    public static tokenSet: TokenSet | undefined;
    public static client: Client;

    private static init(): void {
        KeycloakAdminClientService.kcAdminClient = new KeycloakAdminClient();
        this.kcAdminClient.setConfig({
            baseUrl: process.env.KEYCLOAK_BASE_URL,
            realmName: process.env.KEYCLOAK_REALM_NAME,
        });
    }

    public static getInstance(): KeycloakAdminClient {
        if (!KeycloakAdminClientService.kcAdminClient) {
            KeycloakAdminClientService.init();
        }
        return KeycloakAdminClientService.kcAdminClient;
    }

    public static async auth(): Promise<any> {
        await KeycloakAdminClientService.getInstance().auth({
            username: process.env.KEYCLOAK_USER || '',
            password: process.env.KEYCLOAK_PASSWORD || '',
            grantType: process.env.KEYCLOAK_GRANT_TYPE || '',
            clientId: process.env.KEYCLOAK_CLIENT_ID || '',
        });
        const keycloakIssuer = await Issuer.discover(
            process.env.KEYCLOAK_BASE_URL + '/realms/' + process.env.KEYCLOAK_REALM_NAME,
        );
        this.client = new keycloakIssuer.Client({
            client_id: process.env.KEYCLOAK_CLIENT_ID || '',
            client_secret: process.env.KEYCLOAK_CLIENT_ID || '',
        });
        this.tokenSet = await this.client.grant({
            grant_type: process.env.KEYCLOAK_GRANT_TYPE || '',
            username: process.env.KEYCLOAK_USER || '',
            password: process.env.KEYCLOAK_PASSWORD || '',
        });
    }
}
