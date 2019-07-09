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
        return models.product.findOne({where: {barcode: row.barcode}})
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err);
            })
    },
    sell(req, res, row){
        models.product.findOne({where: { barcode: row.barcode}})
            .then((result) => {
                const stock = result.stock;
                const price = result.price;
                if (stock <= 0) {
                    res.status(500).send(new Error("stock can't be less than 0"));
                } else {
                    models.product.update({
                            stock: stock - 1,
                            stockPrice: (stock - 1) * price
                        },
                        {where: {barcode: row.barcode}})
                        .then(() => {
                            models.product.findOne({where: {barcode: row.barcode}})
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
    upsert(req, res, row) {
        models.product.findOne({
            where: { productId: row.productId }
        })
        .then((result) => {
            if (!result) {
                this.insert(req, res, row);
            } else {
                models.product.update({
                    barcode: row.barcode,
                    name: row.name,
                    price: row.price,
                    stock: row.stock,
                    stockPrice: row.price * row.stock
                }, { where: { productId: row.productId }})
                    .then(() => {
                        res.send(result);
                    })
            }
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
    },
    delete(req, res, row) {
        models.product.destroy({
            where: { id: row.id }
        })
            .then(() => {
                res.status(200).send();
            })
            .catch((err) => {
                res.send(err);
            })
    }
};