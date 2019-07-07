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
        date: new Date(),
        stock: req.body.stock,
        nickname: req.body.recipant
    };

    if (!row.barcode) {
        res.status(500).send("Barcode empty");
    } else if (row.actualPrice === '') {
        res.status(500).send("actualPrice empty");
    } else if (row.stock <= 0) {
        res.status(500).send("can't sell if stock is less than 0")
    } else {
        controller.product.sell(req, res, row);
        controller.sell.insert(req, res, row);
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
        recipantId: req.body.recipantId,
        nickname: req.body.nickname,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        remark: req.body.remark
    };
    controller.recipant.insert(req, res, row);
});

router.post('/send/list', function(req, res, next) {
    const row = {
        date: req.body.today
    };
    controller.recipant.sendList(req, res, row);
});

router.post('/send/props', function(req, res, next) {
    const row = {
        date: req.body.today,
        recipantId: req.body.recipantId
    };
    controller.sell.sendList(req, res, row);
});

router.post('/recipant/delete', function(req, res, next) {
    const row = {
        recipantId: req.body.recipantId
    };
    controller.recipant.delete(req, res, row);
})

module.exports = router;
