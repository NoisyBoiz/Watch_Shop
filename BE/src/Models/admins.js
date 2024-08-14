import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const admins = sequelize.define('admins',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
},{
    timestamps: false
});

export default admins