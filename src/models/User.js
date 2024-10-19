import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../data/index.js';
import { Subscription } from './Subscription.js';
import { Comment } from './Comment.js';
import { Article } from './Article.js';

export class User extends Model {}
User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize, modelName: 'User' }
);