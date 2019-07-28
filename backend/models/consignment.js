'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('consignment', {
        consignmentId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE,
            notNull: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
        price: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        recipantId: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    }, {
        classMethods: {},
        tableName: 'consignment',
        freezeTableName: true,
        timestamps: false
    })
};