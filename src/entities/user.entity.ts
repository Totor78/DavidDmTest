import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Length,
    Default,
    HasMany, ForeignKey, HasOne,
} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {Subscription, ISubscription} from './subscription.entity';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';
import {IGlobalUser} from './globalUser.entity';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';
import {IUserIAM} from './userIAM.entity';
import {IMedia, MediaEntity} from './media.entity';

export enum eTheme {
    BASIC = 'BASIC',
    DARK = 'DARK',
}

export interface IUser extends IGlobalUser{
    description: string;
    dateOfBirth: Date;
    theme: eTheme;
    mediaId?: string;
    media?: IMedia;
    followers: ISubscription[];
    follows: ISubscription[];
}

@ApiModel({
    description: 'User Model',
    name: 'User',
})
@Path('User')
@Table({paranoid: true, tableName: 'user'})
export class User extends Model<User> implements IUser {

    @ApiModelProperty({
        description: 'Id of a User',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
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
        example: ['1997-07-17'],
    })
    @Column(DataTypes.DATEONLY)
    public dateOfBirth!: Date;

    @ApiModelProperty({
        description: 'Theme',
        required: true,
        example: ['DARK'],
    })
    @Default('BASIC')
    @Column(
        DataTypes.ENUM({
            values: ['BASIC', 'DARK'],
        }),
    )
    public theme!: eTheme;

    @ForeignKey(() => MediaEntity)
    @Column(DataTypes.STRING)
    public mediaId?: string;

    @HasOne(() => MediaEntity)
    public media?: IMedia;

    @HasMany(() => Subscription, 'followerId')
    public followers!: ISubscription[];

    @HasMany(() => Subscription, 'followedId')
    public follows!: ISubscription[];
}
