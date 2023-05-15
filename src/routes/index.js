const express = require('express');

const router = express.Router();

const admins = require('./admins');

router.use('/admins', admins);

module.exports = router;
