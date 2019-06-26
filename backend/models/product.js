'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            uniqueKey: true,
            notNull: true
        },
        barcode: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        },
        stockPrice: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        }
    }, {
        classMethods: {},
        tableName: 'product',
        freezeTableName: true,
        timestamps: false
    })
}