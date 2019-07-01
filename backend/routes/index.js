var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
  controller.product.list(req, res);
});

router.post('/sell', function(req, res, next) {
    const row = {
        barcode: req.body.barcode,
        actualPrice: req.body.actualPrice.replace(/,/gi, ''),
        date: new Date()
    };

    if (!row.barcode) {
        res.status(500).send("Barcode empty");
    } else if (row.actualPrice === 0 || row.actualPrice === '') {
        res.status(500).send("actualPrice empty");
    } else {
        controller.sell.insert(req, res, row);
        controller.product.sell(req, res, row);
    }
});

router.post('/select', function(req, res, next) {
    const row = {
        barcode: req.body.barcode
    };
    controller.product.select(req, res, row);
});

router.post('/add', function(req, res, next) {
    const row = {
        barcode: req.body.barcode
    };
    controller.product.add(req, res, row);
});

router.post('/update', function(req, res, next) {
    const row = {
        barcode: req.body.barcode,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };

    if (row.barcode === '' || row.name === '' || row.price === '' || row.stock === '') {
        res.status(500).send("Empty item error");
    }

    row.price = row.price.replace(/,/gi, '');

    controller.product.upsert(req, res, row);
});

router.get('/sell/list', function(req, res, next) {
    controller.sell.list(req, res);
});

router.post('/product/delete', function(req, res, next) {
    const row = {
        id: req.body.id
    };
    controller.product.delete(req, res, row);
});

router.get('/recipant/list', function(req, res, next) {
    controller.recipant.list(req, res);
});

router.post('/recipant/insert', function(req, res, next){
    const row = {
        nickname: req.body.nickname,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    };
    controller.recipant.insert(req, res, row);
});

module.exports = router;
