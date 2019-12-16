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
import {UserEntity} from './user.entity';

export interface ISubscription {
    followedId: v4String;
    followed: UserEntity;
    followerId: v4String;
    follower: UserEntity;
}

@Table({paranoid: true, tableName: 'subscription'})
export class SubscriptionEntity extends Model<SubscriptionEntity> implements ISubscription {
    @PrimaryKey
    @ForeignKey(() => UserEntity)
    @Column(DataTypes.UUID)
    public followedId!: v4String;

    @BelongsTo(() => UserEntity)
    public followed!: UserEntity;

    @PrimaryKey
    @ForeignKey(() => UserEntity)
    @Column( DataTypes.UUID)
    public followerId!: v4String;

    @BelongsTo(() => UserEntity)
    public follower!: UserEntity;
}
