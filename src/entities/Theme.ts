import {Column, Length, Model, NotNull, PrimaryKey, Table} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';

@Table
export class Theme extends Model<Theme> {

    @PrimaryKey
    @Length({max: 20})
    @Column(DataTypes.STRING)
    public key: string;

    @Length({max: 20})
    @NotNull
    @Column(DataTypes.STRING)
    public value: string;

    constructor(values: object, options: BuildOptions, key: string, value: string) {
        super(values, options);
        this.key = key;
        this.value = value;
    }
}
