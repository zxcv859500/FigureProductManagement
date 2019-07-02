const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    insert(req, res, row) {
        let recipantId, sellId;
        Promise.all([
            models.sell.create({
                barcode: row.barcode,
                actualPrice: row.actualPrice,
                date: row.date
            }),
            models.recipant.findOne({
                where: { nickname: row.nickname }
            })
        ])
            .then((result) => {
                sellId = result[0].sellId;
                recipantId = result[1].recipantId;

                models.sequelize.query('INSERT INTO sellapply (sellId, recipantId) VALUES (' + sellId + ', ' + recipantId + ')',
                    { type: models.Sequelize.QueryTypes.SELECT });
            })
    },
    list(req, res, row) {
        models.sequelize.query('SELECT * FROM sell natural join (select barcode, price, name as productName from product)spq natural join sellapply natural join recipant',
            {type: models.Sequelize.QueryTypes.SELECT})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};