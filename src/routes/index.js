const express = require('express');

const admins = require('./admins');

const router = express.Router();

router.use('/admins', admins);

module.exports = router;
