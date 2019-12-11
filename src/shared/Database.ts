import {Sequelize} from 'sequelize-typescript';
import {Theme, User, Subscription} from '@entities';

export class SequelizeConnection {

        private static con: Sequelize;

        private static init(): void {
                SequelizeConnection.con = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '',
                    process.env.DB_PASSWORD, {
                            host: process.env.DB_HOST,
                            port: Number(process.env.DB_PORT),
                            dialect: 'postgres',
                            repositoryMode: true,
                            define: {
                                    schema: process.env.SCHEMA_NAME,
                            },
                            models: [User, Theme, Subscription],
                    });
        }

        public static getInstance(): Sequelize {
                if (!SequelizeConnection.con) {
                        SequelizeConnection.init();
                }

                return SequelizeConnection.con;
        }

}
