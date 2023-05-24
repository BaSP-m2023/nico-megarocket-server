const express = require('express');
const controllersSuperAdmin = require('../controllers/super-admin');
const superAdminValidation = require('../validations/super-admin');

const validationId = require('../validations/validateId');

const router = express.Router();

router
  .put('/:id', validationId.validateId, superAdminValidation.validateUpdate, controllersSuperAdmin.updateAdmin)
  .get('/', controllersSuperAdmin.getAllSuperAdmin)
  .get('/:id', validationId.validateId, controllersSuperAdmin.getSuperAdminById)
  .post('/', superAdminValidation.createSuperAdminValidation, controllersSuperAdmin.createSuperAdmin)
  .delete('/:id', validationId.validateId, controllersSuperAdmin.deleteSuperAdmin);

module.exports = router;
