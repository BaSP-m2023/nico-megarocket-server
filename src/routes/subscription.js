const express = require('express');

const router = express.Router();

const subscriptionController = require('../controllers/subscription');

const middleware = require('../validations/subscription');

router.post('/', middleware.validateCreation, subscriptionController.createSubscription);

module.exports = router;
