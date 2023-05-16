const express = require('express');
const { validateUpdate } = require('../validations/super-admin');
const sAdminController = require('../controllers/super-admin');

const router = express.Router();

router
  .put('/:id', validateUpdate, sAdminController.updateAdmin);

module.exports = router;
