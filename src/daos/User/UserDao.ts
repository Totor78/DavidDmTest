import {v4String} from 'uuid/interfaces';
import {IUser, User} from '../../entities/User';
import {database} from '@shared';

export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getOne: (id: v4String) => Promise<IUser>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

export class UserDao implements IUserDao {
    private userRepository = database.getRepository(User);
    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    /**
     * @param id of the user to return
     */
    public async getOne(id: v4String): Promise<IUser> {
        return this.userRepository.findOne(id);
    }

    /**
     *
     * @param user to add
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param user to update
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
        // TODO
        return {} as any;
    }
}
