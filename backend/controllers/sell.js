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
                        actualPrice: row.actualPrice,
                        date: row.date
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
    delete(req, res, row) {
        models.sell.destroy({
            where: { sellId: row.sellId }
        })
            .then(()=> {
                res.sendStatus(200);
            })
            .catch((err) => {
                res.send(err);
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
        if (row.date !== undefined) {
            models.sequelize.query('select sellId, date, name, deposit, actualPrice from (SELECT productName as name, consignmentId FROM consignment) as a natural join sell natural join sellapply where recipantId=' + row.recipantId + ' and date=' + '"' + row.date + '"',
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((res1) => {
                    models.sequelize.query('SELECT sellId, date, name, deposit, actualPrice FROM sell natural join product natural join sellapply where recipantId=' + row.recipantId + ' and date=' + '"' + row.date + '"',
                        {type: models.Sequelize.QueryTypes.SELECT})
                        .then((result) => {
                            const concat = res1.concat(result);
                            res.send(concat);
                        })
                        .catch((err) => {
                            res.send(err);
                        })
                })
                .catch((err) => {
                    res.send(err);
                })
        } else {
            models.sequelize.query('select sellId, date, name, deposit, actualPrice from (SELECT productName as name, consignmentId FROM consignment) as a natural join sell natural join sellapply where keep = 1 and recipantId=' + row.recipantId,
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((res1) => {
                    models.sequelize.query('SELECT sellId, date, name, deposit, actualPrice FROM sell natural join product natural join sellapply where keep = 1 and recipantId=' + row.recipantId,
                        {type: models.Sequelize.QueryTypes.SELECT})
                        .then((result) => {
                            const concat = res1.concat(result);
                            res.send(concat);
                        })
                        .catch((err) => {
                            res.send(err);
                        })
                })
                .catch((err) => {
                    res.send(err);
                })
        }
    },
    deposit(req, res, row) {
        models.sell.update({
            deposit: true
        }, { where : {
            sellId: row.sellId
            }
        })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    cancel(req, res, row) {
        models.sell.update({
            deposit: false
        }, { where : {
            sellId: row.sellId
            }
        })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    async keep(params) {
        return await models.sell.update({
            keep: true
        }, {where: {
            sellId: params.sellId
        }})
    },
    async send(params) {
        return await models.sell.update({
            keep: false
        }, {where: {
            sellId: params.sellId
        }})
    }
};