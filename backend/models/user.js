'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('user', {
        userId: {
            type: Sequelize.STRING,
            primaryKey: true,
            notNull: true
        },
        userPw: {
            type: Sequelize.STRING,
            notNull: true
        }
    },{
        classMethods: {},
        tableName: 'user',
        freezeTableName: true,
        timestamps: false
    })
};