const express = require('express');

const classController = require('../controllers/class');

const classValidation = require('../validations/class');

const router = express.Router();

router
  .get('/:id', classValidation.validateId, classController.getClassById)
  .get('/', classController.getClasses)
  .delete('/:id', classController.deleteClass);

module.exports = router;
