import {Sequelize} from 'sequelize-typescript';

export const database = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '',
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    models: [__dirname + '/entities'],
});
