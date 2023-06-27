const express = require('express');
const trainerController = require('../controllers/trainer');
const validation = require('../validations/trainer');
const validationId = require('../validations/validateId');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();
router
  .put(
    '/:id',
    verifyToken,
    validationId.validateId,
    validation.validateUpdate,
    trainerController.updateTrainer,
  )
  .get('/', verifyToken, trainerController.getAllTrainers)
  .delete(
    '/:id',
    verifyToken,
    validationId.validateId,
    trainerController.deleteTrainer,
  )
  .get(
    '/:id',
    verifyToken,
    validationId.validateId,
    trainerController.getTrainerById,
  )
  .post(
    '/',
    verifyToken,
    validation.validateCreation,
    trainerController.postTrainer,
  );

module.exports = router;
