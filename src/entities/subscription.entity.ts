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
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';

export interface ISubscription {
    followedId: v4String;
    followed: UserEntity;
    followerId: v4String;
    follower: UserEntity;
}

@ApiModel({
    description: 'Subscription Model',
    name: 'Subscription',
})
@Path('Subscription')
@Table({paranoid: true, tableName: 'subscription'})
export class SubscriptionEntity extends Model<SubscriptionEntity> implements ISubscription {

    @ApiModelProperty({
        description: 'Id of the followed',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @ForeignKey(() => UserEntity)
    @Column(DataTypes.UUID)
    public followedId!: v4String;

    @BelongsTo(() => UserEntity)
    public followed!: UserEntity;

    @ApiModelProperty({
        description: 'Id of the follower',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @ForeignKey(() => UserEntity)
    @Column( DataTypes.UUID)
    public followerId!: v4String;

    @BelongsTo(() => UserEntity)
    public follower!: UserEntity;
}
