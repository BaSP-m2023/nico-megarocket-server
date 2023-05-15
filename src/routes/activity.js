const express = require('express');
const activityController = require('../controllers/activity');
const validations = require('../validations/activity');

const controller = require('../controllers/activity');

const router = express.Router();

router
  .put('/:id', validations.validateUpdate, activityController.updateActivity)
  .get('/', controller.getAllActivities)
  .get('/:id', controller.getActivityById);

module.exports = router;
