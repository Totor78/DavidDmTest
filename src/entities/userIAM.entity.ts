import {v4String} from 'uuid/interfaces';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';
import {IGlobalUser} from './globalUser.entity';

export interface IUserIAM extends IGlobalUser{
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

@ApiModel({
    description: 'UserIAM Model',
    name: 'UserIAM',
})
@Path('UserIAM')
export class UserIAMEntity implements IUserIAM {

    @ApiModelProperty({
        description: 'Id of a User',
        type: 'v4String',
        required: true,
        example: ['75442486-0878-440c-9db1-a7006c25a39f'],
    })
    public id: v4String;

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

    constructor(user: IUserIAM) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
