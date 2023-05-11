const express = require('express');

const router = express.Router();

const admins = require('./routes');

router.use('/admins', admins);

module.exports = router;
