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
            phone: row.phone
        })
            .then(() => {
                this.list(req, res);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};