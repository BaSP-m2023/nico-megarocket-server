const express = require('express');

const activities = require('./activity');

const admins = require('./admins');

const classes = require('./class');

const router = express.Router();

const trainer = require('./trainer');

router.use('/trainer', trainer);

router.use('/activity', activities);

router.use('/admins', admins);

router.use('/class', classes);

module.exports = router;
