'use stritc';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    req.session.nuevo = req.session.nuevo ? req.session.nuevo + 1 : 1
    //res.render('index',{title: 'HOME APP'});
    res.send(`${req.session.nuevo}`)
});

module.exports = router;