import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const colors = sequelize.define('colors',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hex: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

export default colors;