var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/list', function(req, res, next) {
  controller.product.list(req, res);
});

router.post('/api/sell', function(req, res, next) {
    const row = {
        barcode: req.body.barcode,
        name: req.body.name,
        actualPrice: req.body.actualPrice,
        date: new Date()
    };

    if (!row.barcode) {
        res.status(500).send("Barcode empty");
        console.log("Barcode empty");
    } else if (row.actualPrice === 0 || row.actualPrice === '') {
        res.status(500).send("actualPrice empty");
        console.log("actaulPrice empty: ", row.actualPrice);
    } else {
        controller.product.sell(req, res, row);
        controller.sell.insert(req, res, row);
    }
});

router.post('/api/select', function(req, res, next) {   
    const row = {
        barcode: req.body.barcode
    };      
    console.log(row.barcode);
    controller.product.select(req, res, row);
});

router.post('/api/add', function(req, res, next) {
    const row = {
        barcode: req.body.barcode
    };
    controller.product.add(req, res, row);
});

router.post('/api/update', function(req, res, next) {
    const row = {
        barcode: req.body.barcode,
        name: req.body.name,
        price: req.body.price,
        stockPrice: req.body.price * req.body.stock,
        stock: req.body.stock
    };

    controller.product.insert(req, res, row);
});

router.get('/api/sell/list', function(req, res, next) {
    controller.sell.list(req, res);
});

router.post('/api/sell/datelist', function(req, res, next) {
    const row = {
        startDate: req.body.startDate,
        finalDate: req.body.finalDate
    }
    console.log(row);   
    controller.sell.dateList(req, res, row);
});

module.exports = router;
