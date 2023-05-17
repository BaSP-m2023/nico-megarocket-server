const express = require('express');

const activities = require('./activity');

const admins = require('./admins');

const classes = require('./class');

const member = require('./member');

const trainer = require('./trainer');

const subscriptions = require('./subscription');

const superAdmins = require('./super-admin');

const router = express.Router();

router.use('/member', member);

router.use('/trainer', trainer);

router.use('/activity', activities);

router.use('/admins', admins);

router.use('/class', classes);

router.use('/subscription', subscriptions);

router.use('/super-admin', superAdmins);

module.exports = router;
