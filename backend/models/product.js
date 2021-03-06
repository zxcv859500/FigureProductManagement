'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('product', {
        productId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            uniqueKey: true,
            notNull: true
        },
        barcode: {
            type: Sequelize.STRING,
            notNull: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
        stock: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        stockPrice: {
            type: Sequelize.INTEGER,
            notNull: true
        },
        price: {
            type: Sequelize.INTEGER,
            notNull: true
        }
    }, {
        classMethods: {},
        tableName: 'product',
        freezeTableName: true,
        timestamps: false
    })
}