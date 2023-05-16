const express = require('express');
const { validateUpdate } = require('../validations/trainer');
const trainerController = require('../controllers/trainer');
const validation = require('../validations/trainer');

const router = express.Router();

router
  .put('/:id', validateUpdate, trainerController.updateTrainer)
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById)
  .post('/', validation.validateCreation, trainerController.postTrainer);

module.exports = router;
