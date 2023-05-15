const express = require('express');

const controller = require('../controllers/activity');

const validation = require('../validations/activity');

const router = express.Router();

router
  .get('/', controller.getAllActivities)
  .get('/:id', controller.getActivityById)
  .post('/', validation.validateCreation, controller.createActivity);

module.exports = router;
