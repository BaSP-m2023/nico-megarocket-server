const express = require('express');

const router = express.Router();

const superAdmin = require('../controllers/super-admins');

router.use('/superadmin', superAdmin);

module.exports = router;
