const express = require('express');

const router = express.Router();

const memberController = require('../controllers/member');

const middleware = require('../validations/member');

router
  .post('/', middleware.validateCreation, memberController.createMember)
  .put('/:id', middleware.validateUpdate, memberController.updateMember)
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getById);

router.delete('/:id', memberController.deleteMember);

module.exports = router;
