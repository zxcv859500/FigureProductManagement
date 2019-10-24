'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('sell', {
        sellId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        barcode: {
            type: Sequelize.STRING,
            notNull: true
        },
        actualPrice: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        date: {
            type: Sequelize.DATE,
            notNull: true
        },
        deposit: {
            type: Sequelize.BOOLEAN
        },
        consignmentId: {
            type: Sequelize.INTEGER
        },
        keep: {
            type: Sequelize.BOOLEAN
        }
    },{
        classMethods: {},
        tableName: 'sell',
        freezeTableName: true,
        timestamps: false
    })
};