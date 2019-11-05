import {Sequelize} from 'sequelize-typescript';
import {Subscription, User, Theme} from '@entities';

export const database = new Sequelize(process.env.DB_NAME || '', process.env.DB_USERNAME || '',
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        repositoryMode: true,
        models: [User, Theme, Subscription],
    });
