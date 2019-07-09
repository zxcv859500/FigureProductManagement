'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('memo', {
        memoId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        title: {
            type: Sequelize.STRING,
            notNull: true,
        },
        content: {
            type: Sequelize.STRING,
            notNull: true
        }
    }, {
        classMethods: {},
        tableName: 'memo',
        freezeTableName: true,
        timestamps: false
    })
};