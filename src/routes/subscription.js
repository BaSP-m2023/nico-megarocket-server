const express = require('express');
const subscriptionController = require('../controllers/subscription');
const validations = require('../validations/subscription');

const controller = require('../controllers/subscription');

const router = express.Router();

router
  .put('/:id', validations.validateUpdate, subscriptionController.updateSuscription)
  .get('/', controller.getAllSubscriptions)
  .get('/:id', controller.getSubscriptionById);

module.exports = router;
