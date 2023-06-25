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
  .get(
    '/',
    // checkAuth(["ADMIN", "SUPER_ADMIN"]),
    trainerController.getAllTrainers,
  )
  .delete(
    '/:id',
    // checkAuth(["ADMIN", "SUPER_ADMIN"]),
    validationId.validateId,
    trainerController.deleteTrainer,
  )
  .get(
    '/:id',
    // checkAuth(["ADMIN", "SUPER_ADMIN"]),
    validationId.validateId,
    trainerController.getTrainerById,
  )
  .post(
    '/',
    // checkAuth(["ADMIN", "SUPER_ADMIN"]),
    validation.validateCreation,
    trainerController.postTrainer,
  );

module.exports = router;
