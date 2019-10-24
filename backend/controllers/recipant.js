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
        models.recipant.findOne( { where: {
            recipantId: row.recipantId
        }})
            .then((result) => {
                if(result) {
                    result.update({
                        nickname: row.nickname,
                        name: row.name,
                        address: row.address,
                        phone: row.phone,
                        remark: row.remark
                    });
                    res.sendStatus(200);
                }
                else {
                    models.recipant.create({
                        nickname: row.nickname,
                        name: row.name,
                        address: row.address,
                        phone: row.phone,
                        remark: row.remark
                    });
                    res.sendStatus(200);
                }
            })
            .catch((err) => {
                res.send(err);
            })
    },
    sendList(req, res, row) {
        if (row.date !== undefined) {
            models.sequelize.query('select distinct nickname, name, address, phone, remark, recipantId  from sell natural join sellapply natural join recipant where date = "' + row.date + '"',
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    res.send(err);
                })
        } else {
            models.sequelize.query('select distinct nickname, name, address, phone, remark, recipantId from sell natural join sellapply natural join recipant where keep = 1',
                {type: models.Sequelize.QueryTypes.SELECT})
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    res.send(err);
                })
        }
    },
    delete(req, res, row) {
        models.recipant.destroy({
            where: { recipantId: row.recipantId }
        })
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};