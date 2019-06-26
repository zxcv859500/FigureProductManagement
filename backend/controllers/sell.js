const models = require('../models/index');

module.exports = {
    insert(req, res, row) {
        models.sell.create({
            barcode: row.barcode,
            name: row.name,
            actualPrice: row.actualPrice,
            date: row.date
        })
    },
    list(req, res, row) {
        models.sell.findAll()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
};