const express = require('express');

const validationsAdmin = require('../validations/admins');

const controllersAdmin = require('../controllers/admins');

const router = express.Router();

router
  .put('/:id', validationsAdmin.validateUpdate, controllersAdmin.updateAdmin)
  .post('/', validationsAdmin.validateCreation, controllersAdmin.createAdmin)
  .get('/', controllersAdmin.getAdmins)
  .get('/:id', controllersAdmin.getAdminsById);

module.exports = router;
