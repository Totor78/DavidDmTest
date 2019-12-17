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
import {SubscriptionEntity} from './subscription.entity';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';

enum eTheme {
    BASIC,
    DARK,
}

export interface IUser {
    id: v4String;
    description: string;
    dateOfBirth: Date;
    theme: eTheme;
    pictureId: v4String;
    followers: SubscriptionEntity[];
    follows: SubscriptionEntity[];
}

@ApiModel({
    description: 'User Model',
    name: 'User',
})
@Path('User')
@Table({paranoid: true, tableName: 'user'})
export class UserEntity extends Model<UserEntity> implements IUser {

    @ApiModelProperty({
        description: 'Id of a User',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id!: v4String;

    @ApiModelProperty({
        description: 'Description of a user',
        required: true,
        example: ['This is a User'],
    })
    @Length({max: 144})
    @Column(DataTypes.STRING)
    public description!: string;

    @ApiModelProperty({
        description: 'date of birth of a user',
        required: true,
        example: ['This is a User'],
    })
    @Column(DataTypes.DATE)
    public dateOfBirth!: Date;

    @ApiModelProperty({
        description: 'Theme',
        required: true,
        example: ['DARK'],
    })
    @Column(
        DataTypes.ENUM({
            values: ['BASIC', 'DARK'],
        }),
    )
    public theme!: eTheme;

    @ApiModelProperty({
        description: 'pictureId',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @Column(DataTypes.UUID)
    public pictureId!: v4String;

    @HasMany(() => SubscriptionEntity, 'followerId')
    public followers!: SubscriptionEntity[];

    @HasMany(() => SubscriptionEntity, 'followedId')
    public follows!: SubscriptionEntity[];

}
