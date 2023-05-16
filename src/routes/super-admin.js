const express = require('express');
const { validateUpdate } = require('../validations/super-admin');
const trainerController = require('../controllers/super-admin');

const router = express.Router();

router
  .put('/:id', validateUpdate, trainerController.updateTrainer)
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById);

module.exports = router;
