const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    insert(req, res, row) {
        models.sell.create({
            barcode: row.barcode,
            name: row.name,
            actualPrice: row.actualPrice,
            date: row.date
        })
    },
    list(req, res, row) {
        models.sell.findAll()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    dateList(req, res, row) {
        models.sell.findAll({ where: {  date: {
            [Op.and]: {
                [Op.gte]: Date.parse(row.startDate), 
                [Op.lte]: Date.parse(row.finalDate)}}
            }
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('a');
            console.log(err);
            res.send(err);
        })
    }
};