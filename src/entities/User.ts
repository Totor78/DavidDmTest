import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Length,
    NotNull,
    HasOne,
    Default,
    BelongsToMany,
    Scopes, HasMany,
} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {Theme} from './Theme';
import {Subscription} from './Subscription';

export interface IUser {
    id: v4String;
    description: string;
    birthday: Date;
    Theme: Theme;
    picture: string;
    followers: Subscription[];
    follows: Subscription[];
}

@Table({paranoid: true, tableName: 'user'})
export class User extends Model<User> implements IUser {

    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id!: v4String;

    @Length({max: 144})
    @Column(DataTypes.STRING)
    public description!: string;

    @Column(DataTypes.DATE)
    public birthday!: Date;

    @HasOne(() => Theme)
    public Theme!: Theme;

    @Column(DataTypes.STRING)
    public picture!: string;

    @HasMany(() => Subscription, 'followerId')
    public followers!: Subscription[];

    @HasMany(() => Subscription, 'followedId')
    public follows!: Subscription[];

}
