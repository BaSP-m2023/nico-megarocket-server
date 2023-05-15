const express = require('express');

const admins = require('./admins');

const router = express.Router();

const member = require('./members');

router.use('/member', member);

const classes = require('./class');

router.use('/admins', admins);

router.use('/class', classes);

module.exports = router;
