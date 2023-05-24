const express = require('express');

const subscriptionController = require('../controllers/subscription');

const validations = require('../validations/subscription');

const validationId = require('../validations/validateId');

const controller = require('../controllers/subscription');

const router = express.Router();

router
  .post('/', validations.validateCreation, subscriptionController.createSubscription)
  .put('/:id', validationId.validateId, validations.validateUpdate, subscriptionController.updateSubscription)
  .get('/', controller.getAllSubscriptions)
  .get('/:id', validationId.validateId, controller.getSubscriptionById)
  .delete('/:id', validationId.validateId, subscriptionController.deleteSubscription);

module.exports = router;
