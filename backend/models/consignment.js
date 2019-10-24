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
        productName: {
            type: Sequelize.STRING,
            notNull: true
        },
        acceptPrice: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        recipantId: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        sold: {
            type: Sequelize.BOOLEAN
        },
        deposit: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {},
        tableName: 'consignment',
        freezeTableName: true,
        timestamps: false
    })
};