const express = require('express');
const updateTrainers = require('../controllers/trainer');
const validateUpdate = require('../validations/trainer');

const router = express.Router();

router
  .put('/:id', validateUpdate, updateTrainers);

module.exports = router;
