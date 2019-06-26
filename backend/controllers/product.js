const models = require('../models/index');

module.exports = {
    list(req, res) {
        models.product.findAll()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    select(req, res, row) {
        models.product.findOne({where: {barcode: row.barcode}})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    }
    ,
    sell(req, res, row){
        models.product.findOne({where: { barcode: row.barcode}})
            .then((result) => {
                const stock = result.stock;
                const price = result.price;
                models.product.update({
                        stock: stock - 1,
                        stockPrice: (stock - 1) * price
                    },
                    {where: { barcode: row.barcode }})
                    .then(() => {
                        models.product.findOne({where: { barcode: row.barcode }})
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                res.send(err);
                            })
                    })
                    .catch((err) => {
                        res.send(err);
                    })
            })
            .catch((err) => {
                res.send(err);
            })
    },
    add(req, res, row) {
        models.product.findOne({where: { barcode: row.barcode}})
            .then((result) => {
                const stock = result.stock;
                const price = result.price;
                models.product.update({
                        stock: stock + 1,
                        stockPrice: (stock + 1) * price
                    },
                    {where: { barcode: row.barcode }})
                    .then(() => {
                        models.product.findOne({where: { barcode: row.barcode }})
                            .then((result) => {
                                res.send(result);
                            })
                            .catch((err) => {
                                res.send(err);
                            })
                    })
                    .catch((err) => {
                        res.send(err);
                    })
            })
            .catch((err) => {
                res.send(err);
            })
    },
    insert(req, res, row) {
        models.product.create({
            barcode: row.barcode,
            name: row.name,
            price: row.price,
            stock: row.stock,
            stockPrice: row.stockPrice
        })
            .then((result) => {
                models.product.findOne({where: { barcode: row.barcode }})
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((err) => {
                        res.send(err);
                    })
            })
            .catch((err) => {
                res.send(err);
            })
    }
};