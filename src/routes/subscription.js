const express = require('express');

const controller = require('../controllers/subscription');

const router = express.Router();

router
  .get('/', controller.getAllSubscriptions)
  .get('/:id', controller.getSubscriptionById);

module.exports = router;
