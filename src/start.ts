import app from '@server';
import { globalInfoLogger } from '@shared';
import { SequelizeConnection } from '@shared';
import {KeycloakAdminClientService} from './services/keycloakAdminClient.service';

// Start the server
(async () => {
    await SequelizeConnection.getInstance().sync({force: true});
    await KeycloakAdminClientService.auth();

    setInterval(async () => {
        const refreshToken: string =
            KeycloakAdminClientService.tokenSet !== undefined ?
                KeycloakAdminClientService.tokenSet.refresh_token || '' : '';
        KeycloakAdminClientService.tokenSet = await KeycloakAdminClientService.client.refresh(refreshToken);
        KeycloakAdminClientService.getInstance().setAccessToken(
            KeycloakAdminClientService.tokenSet !== undefined ?
                KeycloakAdminClientService.tokenSet.access_token || '' : '',
        );
    }, Number(process.env.KEYCLOAK_REFRESH_TOKEN_TIME) || 58 * 1000);

    const port = Number(process.env.PORT || 3001);
    KeycloakAdminClientService.setConfig();
    app.listen(port, () => {
        globalInfoLogger.info('Express server started on port: ' + port);
    });
})();
