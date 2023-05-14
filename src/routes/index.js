const express = require('express');

const router = express.Router();

const classes = require('./class');

router.use('/class', classes);

module.exports = router;
