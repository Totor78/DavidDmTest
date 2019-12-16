import app from '@server';
import { globalInfoLogger } from '@shared';
import { SequelizeConnection } from '@shared';

// Start the server
(async () => {
    await SequelizeConnection.getInstance().sync();
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        globalInfoLogger.info('Express server started on port: ' + port);
    });
})();
