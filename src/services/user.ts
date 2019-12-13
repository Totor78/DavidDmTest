import KcAdminClient from 'keycloak-admin';
import {logger} from '@shared';

const kcAdminClient = new KcAdminClient();
export async function getusers() {
    try {
        await kcAdminClient.auth({
            username: 'brandon',
            password: 'password44',
            grantType: 'password',
            clientId: 'erzo-cli',
        });
        await kcAdminClient.users.find();
        // tslint:disable-next-line:no-console
        logger.debug(await kcAdminClient.users.find());
        // http://keycloak.erzo.wtf/auth/admin/realms/master/users
    } catch (e) {
        return e;
    }
}
