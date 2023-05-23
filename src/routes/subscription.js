const express = require('express');

const subscriptionController = require('../controllers/subscription');

const validations = require('../validations/subscription');

const controller = require('../controllers/subscription');

const router = express.Router();

router
  .post('/', validations.validateCreation, subscriptionController.createSubscription)
  .put('/:id', validations.validateId, validations.validateUpdate, subscriptionController.updateSubscription)
  .get('/', controller.getAllSubscriptions)
  .get('/:id', validations.validateId, controller.getSubscriptionById)
  .delete('/:id', validations.validateId, subscriptionController.deleteSubscription);

module.exports = router;
