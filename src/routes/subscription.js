const express = require('express');
const subscriptionController = require('../controllers/subscription');
const validations = require('../validations/subscription');

const router = express.Router();

router
  .put('/:id', validations.validateUpdate, subscriptionController.updateSuscription);
module.exports = router;
