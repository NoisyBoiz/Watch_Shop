import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const images = sequelize.define('images',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_watch: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    cl_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
});

export default images;