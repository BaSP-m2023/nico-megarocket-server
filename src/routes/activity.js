const express = require('express');

const controller = require('../controllers/activity');

const validation = require('../validations/activity');

const router = express.Router();

router
  .delete('/:id', controller.deleteActivity)
  .get('/', controller.getAllActivities)
  .get('/:id', controller.getActivityById)
  .post('/', validation.validateCreation, controller.createActivity)
  .put('/:id', validation.validateUpdate, controller.updateActivity);

module.exports = router;
