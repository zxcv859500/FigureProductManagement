'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('recipant', {
        recipantId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: Sequelize.STRING,
            notNull: true,
            uniqueKey: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
        address: {
            type: Sequelize.STRING,
            notNull: true
        },
        phone: {
            type: Sequelize.STRING,
            notNull: true
        }
    }, {
        classMethods: {},
        tableName: 'recipant',
        freezeTableName: true,
        timestamps: false
    })
}