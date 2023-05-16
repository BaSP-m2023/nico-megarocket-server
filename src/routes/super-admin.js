const express = require('express');

const controllersSuperAdmin = require('../controllers/super-admin');

const router = express.Router();

router
  .delete('/:id', controllersSuperAdmin.deleteSuperAdmin);

module.exports = router;
