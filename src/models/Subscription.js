import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data/index.js';


export class Subscription extends Model {}
Subscription.init({
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    targetID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { sequelize, modelName: 'Subscription' }
);