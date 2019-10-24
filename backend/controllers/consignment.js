const models = require('../models');
module.exports = {
    async list(params) {
        const { date } = params;

        if (date === "") {
            return await models.sequelize
                .query(format('SELECT DISTINCT recipantId, nickname, phone, remark, name FROM consignment natural join recipant'),
                    {type: models.Sequelize.QueryTypes.SELECT});
        } else {
            return await models.sequelize
                .query(format('SELECT DISTINCT recipantId, nickname, phone, remark, name FROM consignment natural join recipant date="%s"', date),
                    {type: models.Sequelize.QueryTypes.SELECT});
        }
    },

    async insert(params) {
        const { date, name, acceptPrice, nickname } = params;

        const recipant = await models.recipant.findOne({
            where: { nickname: nickname }
        });

        return await models.consignment.create({
            date: date,
            productName: "[위탁]" + name,
            acceptPrice: acceptPrice,
            recipantId: recipant.recipantId
        })
    },

    async sell(params) {
        let recipantId, sellId;
        const {consignmentId} = params;

        Promise.all([
            models.sell.create({
                barcode: params.barcode,
                actualPrice: params.actualPrice,
                date: params.date,
                consignmentId: consignmentId
            }),
            models.recipant.findOne({
                where: { nickname: params.nickname }
            })
        ])
            .then((result) => {
                sellId = result[0].sellId;
                recipantId = result[1].recipantId;

                models.sequelize.query('INSERT INTO sellapply (sellId, recipantId) VALUES (' + sellId + ', ' + recipantId + ')',
                    { type: models.Sequelize.QueryTypes.SELECT });
                models.consignment.update({
                    sold: true
                }, { where: { consignmentId: consignmentId }});
                models.consignment.update({
                    deposit: params.actualPrice
                }, {where: { consignmentId: consignmentId }})
            });
    },

    async getProps(params) {
        if (params.date !== undefined) {
            return await models.sequelize.query('SELECT date, name, sold, consignmentId, acceptPrice from (SELECT productName as name, consignmentId, sold, date, recipantId, acceptPrice FROM consignment)a where recipantId=' + params.recipantId + ' and date=' + '"' + params.date + '"',
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((res) => {
                    return res;
                })
        } else {
            const result = models.sequelize.query('SELECT date, name, sold, consignmentId, acceptPrice from (SELECT productName as name, consignmentId, sold, date, recipantId, acceptPrice FROM consignment)a where recipantId=' + params.recipantId,
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((res) => {
                    return res;
                });
            return await result;
        }
    },

    async actualPrice(params) {
        if (params.today === undefined) {
            return await models.consignment.findAll({where: {recipantId: params.recipantId}})
                .then((res) => {
                    return res;
                })
        } else {
            return await models.consignment.findAll({where: {recipantId: params.recipantId, date: params.date}})
                .then((res) => {
                    return res;
                })
        }
    },

    async deposit(params) {
        if (params.today === undefined) {
            return await models.consignment.update({deposit: 0}, {where: {recipantId: params.recipantId}})
        } else {
            return await models.consignment.update({deposit: 0}, {where: {recipantId: params.recipantId, date: params.date}})
        }
    }
};

const { format } = require('util');
