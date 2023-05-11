const express = require('express');

const router = express.Router();

const superAdmin = require('../controllers/super-admins');

router.use('/Superadmin', superAdmin);

module.exports = router;
