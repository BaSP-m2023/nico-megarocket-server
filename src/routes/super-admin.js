const express = require('express');

const controllersSuperAdmin = require('../controllers/super-admin');

const router = express.Router();

router
  .get('/', controllersSuperAdmin.getAllSuperAdmin)
  .get('/:id', controllersSuperAdmin.getSuperAdminById);

module.exports = router;
