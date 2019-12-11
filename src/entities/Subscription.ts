import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Length,
    NotNull,
    HasOne,
    Default,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { BuildOptions, DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {User} from './User';

export interface ISubscription {
    followedId: v4String;
    followed: User;
    followerId: v4String;
    follower: User;
}

@Table({paranoid: true, tableName: 'subscription'})
export class Subscription extends Model<Subscription> implements ISubscription {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataTypes.UUID)
    public followedId!: v4String;

    @BelongsTo(() => User)
    public followed!: User;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column( DataTypes.UUID)
    public followerId!: v4String;

    @BelongsTo(() => User)
    public follower!: User;
}
