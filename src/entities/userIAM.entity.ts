import {v4String} from 'uuid/interfaces';
import {ApiModel, ApiModelProperty} from 'swagger-express-ts';
import {Path} from 'typescript-rest';
import {IGlobalUser} from './globalUser.entity';
import UserRepresentation from 'keycloak-admin/lib/defs/userRepresentation';

export interface IUserIAM extends IGlobalUser {
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
export class UserIAM implements IUserIAM {

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

    constructor(id: v4String, username: string, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public static instantiateFromUserRepresentation(userRepresentation: UserRepresentation): IUserIAM {
        return new UserIAM(
            userRepresentation.id as unknown as v4String,
            userRepresentation.username as string,
            userRepresentation.firstName as string,
            userRepresentation.lastName as string,
            userRepresentation.email as string,
        );
    }

    public static getUserRepresentationFromUserIAM(userIAM: IUserIAM): UserRepresentation {
        return {
            id: userIAM.id.toString(),
            email: userIAM.email,
            firstName: userIAM.firstName,
            lastName: userIAM.lastName,
            username: userIAM.username,
        } as UserRepresentation;
    }
}
