const express = require('express');
const updateTrainers = require('../controllers/trainer');

const router = express.Router();

router
  .put('/:id', updateTrainers);

module.exports = router;
