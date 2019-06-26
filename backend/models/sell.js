'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('sell', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        barcode: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        actualPrice: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        }
    },{
        classMethods: {},
        tableName: 'sell',
        freezeTableName: true,
        timestamps: false
    })
}