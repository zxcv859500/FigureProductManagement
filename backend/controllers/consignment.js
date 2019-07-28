const models = require('../models');
const { format } = require('util');

module.exports = {
    async list(params) {
        const { date } = params;

        return await models.sequelize
            .query(format('SELECT * FROM consignment natural join recipant where date=%s', date),
                {type: models.Sequelize.QueryTypes.SELECT});
    },

    async insert(params) {
        const { date, name, price, nickname } = params;

        const recipant = await models.recipant.findOne({
            where: { nickname: nickname }
        });

        return await models.consignment.create({
            date: date,
            name: name,
            price: price,
            recipantId: recipant.recipantId
        })
    }
};