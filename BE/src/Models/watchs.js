import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const watchs = sequelize.define('watchs',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_size: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    createdAt: { 
        type: DataTypes.DATE, 
        defaultValue: sequelize.fn('getdate')
    }
},{
    timestamps: false,
    // createdAt: 'createdAt',
    // updatedAt: false,
});

export default watchs;