import {v4String} from 'uuid/interfaces';
import {database} from '@shared';
import {IUser, User} from '@entities';

export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    getOne: (id: v4String) => Promise<IUser|null>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: v4String) => Promise<void>;
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
    public async getOne(id: v4String): Promise<IUser|null> {
        return this.userRepository.findOne({ where: {id: String(id) }});
    }
    /**
     *
     * @param user to add
     */
    public async add(user: IUser): Promise<any> {
        return this.userRepository.create({user});
    }

    /**
     *
     * @param user to update
     */
    public async update(user: IUser): Promise<any> {

        return this.userRepository.update(user, {
            where: {
            id: String(user.id),
            }});
    }

    /**
     *
     * @param id
     */
    public async delete(id: v4String): Promise<any> {

        return this.userRepository.destroy( {
            where: {
                id: String(id),
            },
        });
    }
}
