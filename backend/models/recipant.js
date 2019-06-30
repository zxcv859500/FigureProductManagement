'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('recipant', {
        rdcipantId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nickname: {
            type: Sequelize.STRING,
            notNull: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
        address: {
            type: Sequelize.STRING,
            notNull: true
        },
        account: {
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