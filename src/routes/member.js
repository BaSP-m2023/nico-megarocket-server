const express = require('express');

const router = express.Router();

const memberController = require('../controllers/member');

const middleware = require('../validations/member');

const validationId = require('../validations/validateId');

router
  .post('/', middleware.validateCreation, memberController.createMember)
  .put('/:id', validationId.validateId, middleware.validateUpdate, memberController.updateMember)
  .get('/', memberController.getAllMembers)
  .get('/:id', validationId.validateId, memberController.getById)
  .delete('/:id', validationId.validateId, memberController.deleteMember);

module.exports = router;
