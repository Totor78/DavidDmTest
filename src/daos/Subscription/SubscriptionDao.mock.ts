import { MockDaoMock } from '../MockDb/MockDao.mock';
import { ISubscriptionDao } from './SubscriptionDao';
import uuid from 'uuid';
import {v4String} from 'uuid/interfaces';
import {IUser} from '../../entities/User';
import {ISubscription} from '@entities';

export class SubscriptionDao extends MockDaoMock implements ISubscriptionDao {
    public async add(subscription: ISubscription): Promise<any> {
        return null as any;
    }
    public async delete(followerId: v4String, followedId: v4String): Promise<void> {
        return;
    }
    public async getAll(): Promise<ISubscription[]> {
        return [];
    }
    public async getOne(followerId: v4String, followedId: v4String): Promise<ISubscription | null> {
        return null as any;
    }
    public async update(subscription: ISubscription): Promise<any> {
        return null as any;
    }
}
