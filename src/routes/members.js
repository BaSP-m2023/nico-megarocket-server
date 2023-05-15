const express = require('express');

const memberController = require('../controllers/member');

const validations = require('../validations/members');

const router = express.Router();

router
  .post('/', validations.validateCreation, memberController.createMember);

module.exports = router;
