const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    login(req, res, row) {
        models.user.findOne({
            where: { userId: row.userId }
        }).then((result) => {
                let pw = Buffer.from(row.userPw).toString('base64');
                if (result.userPw === pw) {
                    res.send({
                        token: row.token,
                        status: 'success'
                    });
                } else {
                    res.send('fail');
                }
            })
            .catch((err) => {
                res.send(err.toString());
            })
    },
    auth(req, res, row) {
        res.send(row);
    }
};