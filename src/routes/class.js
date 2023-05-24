const express = require('express');

const classController = require('../controllers/class');

const classValidation = require('../validations/class');

const validationId = require('../validations/validateId');

const router = express.Router();

router
  .post('/', classValidation.validateCreateClass, classController.createClass)
  .get('/:id', validationId.validateId, classValidation.validateId, classController.getClassById)
  .get('/', classController.getClasses)
  .put('/:id', validationId.validateId, classValidation.validateUpdate, classController.updateClass)
  .delete('/:id', validationId.validateId, classController.deleteClass);

module.exports = router;
