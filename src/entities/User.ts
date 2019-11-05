import {Table, Column, Model, PrimaryKey, Length, NotNull, HasOne} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {Theme} from './Theme';

export interface IUser {
    id: v4String;
    description?: string;
    birthday?: Date;
    theme?: Theme;
}

@Table
export class User extends Model<User> implements IUser {

    @PrimaryKey
    @Column(DataTypes.UUID)
    public id!: v4String;

    @Length({max: 144})
    @Column
    public description?: string;

    @Column
    public birthday?: Date;

    @HasOne(() => Theme)
    public theme?: Theme;

}
