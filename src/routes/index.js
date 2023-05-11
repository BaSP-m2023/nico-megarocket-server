const express = require('express');

const router = express.Router();

const superAdmin = require('./super-admins');

router.use('/superadmin', superAdmin);

module.exports = router;
