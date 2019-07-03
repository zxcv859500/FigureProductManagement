const models = require('../models/index');

module.exports = {
    list(req, res) {
        models.recipant.findAll()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    insert(req, res, row) {
        models.recipant.create({
            nickname: row.nickname,
            name: row.name,
            address: row.address,
            phone: row.phone,
            remark: row.remark
        })
            .then(() => {
                this.list(req, res);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    sendList(req, res, row) {
        models.sequelize.query('select distinct nickname, name, address, phone, remark, recipantId  from sell natural join sellapply natural join recipant where date = "' + row.date + '"',
            { type: models.Sequelize.QueryTypes.SELECT })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};