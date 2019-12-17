import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IUserDao } from './user.dao';
import uuid = require('uuid');
import {v4String} from 'uuid/interfaces';
import {IUser} from '../../entities/user.entity';

export class UserDao extends MockDaoMock implements IUserDao {

    public async getAll(): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.users;
        } catch (err) {
            throw err;
        }
    }

    public async getOne(id: v4String): Promise<IUser> {
        return null as any;
    }

    public async getFollowersOfUser(id: v4String): Promise<any> {
        return null as any;
    }

    public async getFollowsOfUser(id: v4String): Promise<any> {
        return null as any;
    }

    public async add(user: IUser): Promise<void> {
        try {
            const db = await super.openDb();
            user.id = uuid.v4;
            db.users.push(user);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(user: IUser): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === user.id) {
                    db.users[i] = user;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('UserIAMEntity not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: v4String): Promise<void> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.users.length; i++) {
                if (db.users[i].id === id) {
                    db.users.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('UserIAMEntity not found');
        } catch (err) {
            throw err;
        }
    }
}
