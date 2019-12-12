import KcAdminClient from 'keycloak-admin';

const kcAdminClient = new KcAdminClient();
export async function getusers() {
    try {
        await kcAdminClient.users.find();
    } catch (e) {
        return e;
    }
}
