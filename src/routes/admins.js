const express = require('express');

const validations = require('../validations/admins');
const controllersAdmin = require('../controllers/admins');

const router = express.Router();

router
  .put('/:id', validations.validateUpdate, controllersAdmin.updateAdmin);

module.exports = router;
