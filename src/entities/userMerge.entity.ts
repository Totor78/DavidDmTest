import {IUser, eTheme, User} from './user.entity';
import {IUserIAM, UserIAM} from './userIAM.entity';
import {v4String} from 'uuid/interfaces';
import {ISubscription} from './subscription.entity';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';
import {Column, Default, Length, PrimaryKey} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {IMedia} from './media.entity';

export default interface IUserMerge extends IUserIAM, IUser {
}

@ApiModel({
    description: 'UserMerge Model',
    name: 'UserMerge',
})
@Path('UserMerge')
export class UserMerge implements IUserMerge {

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
        description: 'username of a User',
        required: true,
        example: ['rocky'],
    })
    public username: string;

    @ApiModelProperty({
        description: 'firstName of a User',
        required: true,
        example: ['dupond'],
    })
    public firstName: string;

    @ApiModelProperty({
        description: 'lastName of a User',
        required: true,
        example: ['dupont'],
    })
    public lastName: string;

    @ApiModelProperty({
        description: 'email of a User',
        required: true,
        example: ['test@mail.io'],
    })
    public email: string;

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
        description: 'mediaId',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @Column(DataTypes.UUID)
    public mediaId?: string;

    public media?: IMedia;

    public followers!: ISubscription[];
    public follows!: ISubscription[];

    constructor(user: IUser, userIAM: IUserIAM) {
        this.id = userIAM.id;

        this.dateOfBirth = new Date(user.dateOfBirth);
        this.description = user.description;
        this.followers = user.followers;
        this.follows = user.follows;
        this.mediaId = user.mediaId;
        this.media = user.media;
        this.theme = user.theme;

        this.email = userIAM.email;
        this.firstName = userIAM.firstName;
        this.lastName = userIAM.lastName;
        this.username = userIAM.username;
    }

    public static instantiateFromUserMerge(userMerge: IUserMerge) {
        return new UserMerge(
            {
                id: userMerge.id,
                description: userMerge.description,
                dateOfBirth: new Date(userMerge.dateOfBirth),
                followers: userMerge.followers,
                follows: userMerge.follows,
                mediaId: userMerge.mediaId,
                media: userMerge.media,
                theme: userMerge.theme,
            } as IUser,
            new UserIAM(
                userMerge.id,
                userMerge.username,
                userMerge.firstName,
                userMerge.lastName,
                userMerge.email,
            ),
        );
    }

    public getUserIam(): IUserIAM {
        return new UserIAM(
            this.id,
            this.username,
            this.firstName,
            this.lastName,
            this.email,
        );
    }

}
