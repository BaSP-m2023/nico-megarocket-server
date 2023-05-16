const express = require('express');
const validateUpdate = require('../validations/trainer');
const trainerController = require('../controllers/trainer');

const router = express.Router();

router
  .put('/:id', validateUpdate.validateCreation, trainerController.updateTrainer)
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById);

module.exports = router;
