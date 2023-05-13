const express = require('express');

const activities = require('./activity');

const router = express.Router();

router.use('/activity', activities);
module.exports = router;
