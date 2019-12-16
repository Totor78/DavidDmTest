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
import {ThemeEntity} from './theme.entity';
import {SubscriptionEntity} from './subscription.entity';

export interface IUser {
    id: v4String;
    description: string;
    birthday: Date;
    Theme: ThemeEntity;
    picture: string;
    followers: SubscriptionEntity[];
    follows: SubscriptionEntity[];
}

@Table({paranoid: true, tableName: 'user'})
export class UserEntity extends Model<UserEntity> implements IUser {

    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id!: v4String;

    @Length({max: 144})
    @Column(DataTypes.STRING)
    public description!: string;

    @Column(DataTypes.DATE)
    public birthday!: Date;

    @HasOne(() => ThemeEntity)
    public Theme!: ThemeEntity;

    @Column(DataTypes.STRING)
    public picture!: string;

    @HasMany(() => SubscriptionEntity, 'followerId')
    public followers!: SubscriptionEntity[];

    @HasMany(() => SubscriptionEntity, 'followedId')
    public follows!: SubscriptionEntity[];

}
