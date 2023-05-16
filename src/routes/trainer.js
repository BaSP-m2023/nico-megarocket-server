const express = require('express');
const validateTrainer = require('../validations/trainer');
const trainerController = require('../controllers/trainer');

const router = express.Router();

router
  .put('/:id', validateTrainer.validateUpdate, trainerController.updateTrainer)
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById);

module.exports = router;
