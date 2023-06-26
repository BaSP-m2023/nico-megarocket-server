const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const validationId = require('../validations/validateId');
const adminValidate = require('../validations/admins');

const router = express.Router();

const controllersAdmin = require('../controllers/admins');

router
  .put('/:id', verifyToken, validationId.validateId, adminValidate.validateUpdate, controllersAdmin.updateAdmin)
  .get('/', verifyToken, controllersAdmin.getAdmins)
  .get('/:id', verifyToken, validationId.validateId, controllersAdmin.getAdminsById)
  .post('/', verifyToken, adminValidate.validateCreation, controllersAdmin.createAdmin)
  .delete('/:id', verifyToken, validationId.validateId, controllersAdmin.deleteAdmin);

module.exports = router;
