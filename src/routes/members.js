const express = require('express');

const memberController = require('../controllers/member');

const validations = require('../validations/membersValidations');

const router = express.Router();

router
  .post('/', validations.validateCreation, memberController.createMember)
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getById);

module.exports = router;
