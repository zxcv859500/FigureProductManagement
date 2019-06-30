const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    insert(req, res, row) {
        models.sell.create({
            barcode: row.barcode,
            actualPrice: row.actualPrice,
            date: row.date
        })
    },
    list(req, res, row) {
        models.sequelize.query('select * from sell natural join product',
            {type: models.Sequelize.QueryTypes.SELECT})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};