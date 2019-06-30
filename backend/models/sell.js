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
        }
    },{
        classMethods: {},
        tableName: 'sell',
        freezeTableName: true,
        timestamps: false
    })
}