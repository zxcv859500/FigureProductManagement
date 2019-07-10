const models = require('../models/index');

module.exports = {
    list(req, res) {
        models.memo.findAll()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    insert(req, res, row) {
        models.memo.create({
            date: row.date,
            content: row.content
        })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
}