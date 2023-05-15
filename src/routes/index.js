const express = require('express');

const admins = require('./admins');

const router = express.Router();

const superAdmin = require('./super-admins');
const activity = require('./activity');

router.use('/superadmin', superAdmin);
router.use('/activity', activity);
const classes = require('./class');

router.use('/admins', admins);

router.use('/class', classes);

module.exports = router;
