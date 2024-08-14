import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const sizes = sequelize.define('sizes',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

export default sizes;