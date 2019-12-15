import KcAdminClient from 'keycloak-admin';
import {Issuer} from 'openid-client';
export async function getusers(authorization: string) {
    try {
        const kcAdminClient = new KcAdminClient();
        await  kcAdminClient.setConfig({
        baseUrl: 'http://keycloak.erzo.wtf/auth',
        realmName: 'master',
    });
        await kcAdminClient.auth({
                username: 'brandon',
                password: 'password44',
                grantType: 'password',
                clientId: 'erzo-cli',
            },
        );
        kcAdminClient.accessToken = authorization;
        kcAdminClient.refreshToken = authorization;
        // kcAdminClient.setAccessToken(authorization);
        const users = await kcAdminClient.users.find();
        return kcAdminClient.getRequestConfig();
    } catch (e) {
        return e;
    }
}
