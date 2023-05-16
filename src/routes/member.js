const express = require('express');

const router = express.Router();

const memberController = require('../controllers/member');

const middleware = require('../validations/member');

router.put('/:id', middleware.validateUpdate, memberController.updateMember);

router.delete('/:id', memberController.deleteMember);

module.exports = router;
