import { configure, getLogger } from 'log4js';
import {beforeMethod} from 'kaop-ts';
configure({
    appenders: {
        controllers: { type: 'console' },
        daos: { type: 'console' },
        global: { type: 'console' },
        services: { type: 'console' },
    },
    categories: {
        controllers: {
            appenders: [
                'controllers',
            ],
            level: 'info',
        },
        daos: {
            appenders: [
                'daos',
            ],
            level: 'info',
        },
        default: {
            appenders: [
                'global',
            ],
            level: 'info',
        },
        services: {
            appenders: [
                'daos',
            ],
            level: 'info',
        },
    },
});

export const globalInfoLogger = getLogger();

const controllerLogger = getLogger('controllers');
export const NameCallerArgsReturnLogControllersInfoLevel = (className: string) => {
    return beforeMethod((meta) => {
        controllerLogger.info('Inside ' + className);
        controllerLogger.info(meta.method.name + ' called');
        controllerLogger.info(meta.args.length > 0 ? 'With arguments : ' + 'request, response, next' : 'Without arguments');
    });
};

const daoLogger = getLogger('daos');
export const NameCallerArgsReturnLogDaosInfoLevel = (className: string) => beforeMethod((meta) => {
    daoLogger.info('Inside ' + className);
    daoLogger.info(meta.method.name + ' called');
    daoLogger.info(meta.args.length > 0 ? 'With arguments : ' + meta.args : 'Without arguments');
});

const serviceLogger = getLogger('services');
export const NameCallerArgsReturnLogServicesInfoLevel = (className: string) => beforeMethod((meta) => {
    serviceLogger.info('Inside ' + className);
    serviceLogger.info(meta.method.name + ' called');
    serviceLogger.info(meta.args.length > 0 ? 'With arguments : ' + meta.args : 'Without arguments');
});
