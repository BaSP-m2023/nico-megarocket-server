const express = require('express');

const validationsAdmin = require('../validations/admins');

const controllersAdmin = require('../controllers/admins');

const validationId = require('../validations/validateId');

const router = express.Router();

router
  .put('/:id', validationId.validateId, validationsAdmin.validateUpdate, controllersAdmin.updateAdmin)
  .post('/', validationsAdmin.validateCreation, controllersAdmin.createAdmin)
  .get('/', controllersAdmin.getAdmins)
  .get('/:id', validationId.validateId, controllersAdmin.getAdminsById)
  .delete('/:id', validationId.validateId, controllersAdmin.deleteAdmin);

module.exports = router;
