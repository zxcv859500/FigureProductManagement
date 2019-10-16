const models = require('../models');
const { format } = require('util');

module.exports = {
    async list(params) {
        const { date } = params;

        if (date === "") {
            return await models.sequelize
                .query(format('SELECT * FROM consignment natural join recipant where sold=0'),
                    {type: models.Sequelize.QueryTypes.SELECT});
        } else {
            return await models.sequelize
                .query(format('SELECT * FROM consignment natural join recipant where sold=0 and date="%s"', date),
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
            productName: name,
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
            });
    }
};