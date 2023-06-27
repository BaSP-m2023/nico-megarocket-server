const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const adminValidations = require('../validations/admins');
const validationId = require('../validations/validateId');

const router = express.Router();

const adminControllers = require('../controllers/admins');

router
  .get('/', verifyToken, adminControllers.getAdmins)
  .get('/:id', verifyToken, validationId.validateId, adminControllers.getAdminsById)
  .post('/', verifyToken, adminValidations.validateCreation, adminControllers.createAdmin)
  .put('/:id', verifyToken, validationId.validateId, adminValidations.validateUpdate, adminControllers.updateAdmin)
  .delete('/:id', verifyToken, validationId.validateId, adminControllers.deleteAdmin);

module.exports = router;
