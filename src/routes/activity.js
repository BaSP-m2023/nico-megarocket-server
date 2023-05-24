const express = require('express');

const controller = require('../controllers/activity');

const validation = require('../validations/activity');

const validationId = require('../validations/validateId');

const router = express.Router();

router
  .delete('/:id', validationId.validateId, controller.deleteActivity)
  .get('/', controller.getAllActivities)
  .get('/:id', validationId.validateId, controller.getActivityById)
  .post('/', validation.validateCreation, controller.createActivity)
  .put('/:id', validationId.validateId, validation.validateUpdate, controller.updateActivity);

module.exports = router;
