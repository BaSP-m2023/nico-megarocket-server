const express = require('express');

const router = express.Router();

// const superAdmin = require('./super-admins');
const activity = require('./activity');

// router.use('/superadmin', superAdmin);
router.use('/activity', activity);

module.exports = router;
