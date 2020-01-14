import {v4String} from 'uuid/interfaces';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';
import {
    AllowNull, BelongsTo,
    Column,
    Default, ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {User} from './user.entity';

export enum eMedia {
    VIDEO,
    IMAGE,
}
export interface IMedia {
    id?: string;
    type?: eMedia;
    userId?: v4String;
    user?: User;
}

@ApiModel({
    description: 'Media Model',
    name: 'Media',
})
@Path('Media')
@Table({paranoid: true, tableName: 'media'})
export class MediaEntity extends Model<MediaEntity> implements IMedia {

    @ApiModelProperty({
        description: 'Id of a Media',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @PrimaryKey
    @Column(DataTypes.UUID)
    public id?: string;

    @ApiModelProperty({
        description: 'Content of a Post',
        required: true,
        example: ['IMAGE'],
    })
    @AllowNull(false)
    @Column(
        DataTypes.ENUM({
            values: ['IMAGE', 'VIDEO'],
        }),
    )
    public type?: eMedia;

    @ApiModelProperty({
        description: 'Id of a post',
        required: false,
        type: 'v4String',
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    @ForeignKey(() => User)
    @Column(DataTypes.UUID)
    public userId?: v4String;

    @BelongsTo(() => User)
    public user?: User;
}
