const express = require('express');

const controller = require('../controllers/activity');

const router = express.Router();

router
  .get('/', controller.getAllActivities)
  .get('/:id', controller.getActivityById);

module.exports = router;
