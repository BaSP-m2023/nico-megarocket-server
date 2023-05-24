const express = require('express');
const trainerController = require('../controllers/trainer');
const validation = require('../validations/trainer');

const validationId = require('../validations/validateId');

const router = express.Router();

router
  .put('/:id', validationId.validateId, validation.validateUpdate, trainerController.updateTrainer)
  .get('/', trainerController.getAllTrainers)
  .delete('/:id', validationId.validateId, trainerController.deleteTrainer)
  .get('/:id', validationId.validateId, trainerController.getTrainerById)
  .post('/', validation.validateCreation, trainerController.postTrainer);

module.exports = router;
