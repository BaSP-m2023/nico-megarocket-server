const express = require('express');

const router = express.Router();

const member = require('./member');

router.use('/member', member);

module.exports = router;
