import {Table, Column, Model, PrimaryKey, Length, NotNull, HasOne} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {Theme} from './Theme';

export interface IUser {
    id?: v4String;
    description: string;
    birthday: Date;
    theme: Theme;
}

@Table
export class User extends Model<User> implements IUser {

    @PrimaryKey
    @Column(DataTypes.UUIDV4)
    public id?: v4String;

    @Length({max: 144})
    @Column(DataTypes.STRING)
    public description: string;

    @Column(DataTypes.DATE)
    @NotNull
    public birthday: Date;

    @Column
    @NotNull
    @HasOne(() => Theme)
    public theme: Theme;

    constructor(values: object, options: BuildOptions, description: string, birthday: Date, theme: Theme) {
        super(values, options);
        this.description = description;
        this.birthday = birthday;
        this.theme = theme;
    }
}
