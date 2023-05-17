const express = require('express');

const router = express.Router();

const superAdminController = require('../controllers/super-admin');

const superAdminValidation = require('../validations/super-admin');

router.post('/', superAdminValidation.createSuperAdminValidation, superAdminController.createSuperAdmin);

module.exports = router;
