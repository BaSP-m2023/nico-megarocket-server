const express = require('express');

const classController = require('../controllers/class');

const router = express.Router();

router
  .get('/', classController.getClasses)
  .get('/:id', classController.getClassById);

module.exports = router;
