import {Column, ForeignKey, Length, Model, NotNull, PrimaryKey, Table} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';
import {v4String} from 'uuid/interfaces';
import {UserEntity} from './user.entity';

@Table({paranoid: true, tableName: 'theme'})
export class ThemeEntity extends Model<ThemeEntity> {

    @PrimaryKey
    @Length({max: 20})
    @Column(DataTypes.UUID)
    public id?: v4String;

    @Length({max: 20})
    @Column
    public value?: string;

    @ForeignKey(() => UserEntity)
    @Column(DataTypes.UUID)
    private userId?: v4String;
}
