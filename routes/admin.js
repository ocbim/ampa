'use-stritc';
const express = require('express');
const router = express.Router();

router.get('/profile', function (req, res, next) {
    res.send(`Estas en profile`)
});

module.exports = router;