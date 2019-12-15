import KcAdminClient from 'keycloak-admin';
export async function getusers(authorization: string) {
    try {
        const kcAdminClient = new KcAdminClient();
        await  kcAdminClient.setConfig({
        baseUrl: 'http://keycloak.erzo.wtf/auth',
        realmName: 'master',
    });
        kcAdminClient.setAccessToken(authorization);
        const users = await kcAdminClient.users.find();
        return users;
    } catch (e) {
        return e;
    }
}
export async function getuserByName(authorization: string, name: string) {
    try {
        const kcAdminClient = new KcAdminClient();
        await  kcAdminClient.setConfig({
            baseUrl: 'http://keycloak.erzo.wtf/auth',
            realmName: 'master',
        });
        kcAdminClient.setAccessToken(authorization);
        const user = await kcAdminClient.users.find({
            username: name,
        });
        return user;
    } catch (e) {
        return e;
    }
}
