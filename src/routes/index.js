const express = require('express');

const router = express.Router();

const member = require('./members');

router.use('/member', member);

module.exports = router;
