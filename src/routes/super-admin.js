const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const validationId = require('../validations/validateId');
const validateSuperAdmin = require('../validations/super-admin');

const router = express.Router();

const controllerSuperAdmin = require('../controllers/super-admin');

router
  .put('/:id', verifyToken, validationId.validateId, validateSuperAdmin.validateUpdate, controllerSuperAdmin.updateAdmin)
  .get('/', verifyToken, controllerSuperAdmin.getAllSuperAdmin)
  .get('/:id', verifyToken, validationId.validateId, controllerSuperAdmin.getSuperAdminById)
  .post('/', verifyToken, validateSuperAdmin.createSuperAdminValidation, controllerSuperAdmin.createSuperAdmin)
  .delete('/:id', verifyToken, validationId.validateId, controllerSuperAdmin.deleteSuperAdmin);

module.exports = router;
