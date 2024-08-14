import sequelize from "../Config/index.js";
import {DataTypes} from 'sequelize';

const details = sequelize.define('details',{
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_watch: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    id_color: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    oldPrice: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null
    }
},{
    timestamps: false
});

export default details;