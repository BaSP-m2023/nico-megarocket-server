const express = require('express');
const activityController = require('../controllers/activity');
const validations = require('../validations/activity');

const router = express.Router();

router
  // .delete('/:id', activityController.deleteActivity)
  .put('/:id', validations.validateUpdate, activityController.updateActivity);

module.exports = router;
