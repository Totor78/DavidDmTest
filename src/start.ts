import app from '@server';
import { logger } from '@shared';
import { database } from '@shared';

// Start the server
(async () => {
    await database.sync();
    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
})();
