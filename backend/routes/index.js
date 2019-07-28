var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
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

    console.log(row.date);

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

router.post('/product/update', function(req, res, next) {
    const row = {
        productId: req.body.productId,
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

router.post('/sell/update', function(req, res, next) {
    const row = {
        nickname: req.body.recipant,
        sellId: req.body.sellId,
        actualPrice: req.body.actualPrice.replace(/,/gi, ''),
        date: new Date(req.body.date)
    };
    row.date.setDate(row.date.getDate() + 1);

    controller.sell.update(req, res, row);
});

router.post('/sell/delete', function(req, res, next) {
    const row = {
        sellId : req.body.sellId
    };
    controller.sell.delete(req, res, row);
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

router.post('/send/deposit', function(req, res, next) {
    const row = {
        sellId: req.body.sellId
    };
    controller.sell.deposit(req, res, row);
});

router.post('/send/cancel', function(req, res, next) {
    const row = {
        sellId: req.body.sellId
    };
    controller.sell.cancel(req, res, row);
});

router.post('/recipant/delete', function(req, res, next) {
    const row = {
        recipantId: req.body.recipantId
    };
    controller.recipant.delete(req, res, row);
});

router.get('/memo/list', function(req, res, next) {
    controller.memo.list(req, res);
});

router.post('/memo/insert', function(req, res, next) {
    const row = {
        date: new Date(),
        content: req.body.content
    };
    controller.memo.insert(req, res, row);
});

router.post('/memo/delete', function(req, res, next) {
    const row = {
        memoId: req.body.memoId
    };
    controller.memo.delete(req, res, row);
});

router.get('/consignment/list', function(req, res, next) {
    controller.consignment.list(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.post('/consignment/insert', function(req, res, next) {
    req.body.date = new Date();

    controller.consignment.insert(req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.send(err);
        })
});

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";
    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};

module.exports = router;
