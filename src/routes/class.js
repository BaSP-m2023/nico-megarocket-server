const express = require('express');

const classController = require('../controllers/class');

const classValidation = require('../validations/class');

const router = express.Router();

router
  .post('/', classValidation.validateCreateClass, classController.createClass)
  .get('/:id', classValidation.validateId, classController.getClassById)
  .get('/', classController.getClasses)
  .put('/:id', classValidation.validateUpdate, classController.updateClass)
  .delete('/:id', classController.deleteClass);

module.exports = router;
