import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {IUser, User} from './user.entity';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';

export interface ISubscription {
    followedId: v4String;
    followed: IUser;
    followerId: v4String;
    follower: IUser;
}

@ApiModel({
    description: 'Subscription Model',
    name: 'Subscription',
})
@Path('Subscription')
@Table({tableName: 'subscription'})
export class Subscription extends Model<Subscription> implements ISubscription {

    @ApiModelProperty({
        description: 'Id of the followed',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataTypes.UUID)
    public followedId!: v4String;

    @BelongsTo(() => User)
    public followed!: IUser;

    @ApiModelProperty({
        description: 'Id of the follower',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @ForeignKey(() => User)
    @Column( DataTypes.UUID)
    public followerId!: v4String;

    @BelongsTo(() => User)
    public follower!: IUser;
}
