const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    update(req, res, row) {
        let recipantId;
        models.recipant.findOne({
            where: { nickname: row.nickname }
        })
            .then((result) => {
                recipantId = result.recipantId;

                Promise.all([
                    models.sell.update({
                        actualPrice: row.actualPrice
                    }, { where: { sellId: row.sellId }}),
                    models.sequelize.query('UPDATE sellapply SET recipantId=' + recipantId + ' WHERE sellId=' + row.sellId)
                ])
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        res.send(err);
                    })
            })
    },
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
    },
    sendList(req, res, row) {
        models.sequelize.query('SELECT date, name, actualPrice FROM sell natural join product natural join sellapply where recipantId=' + row.recipantId + ' and date=' + '"' + row.date + '"',
            { type: models.Sequelize.QueryTypes.SELECT })
            .then((result => {
                res.send(result);
            }))
            .catch((err) => {
                res.send(err);
            })
    }
};