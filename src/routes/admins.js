const express = require('express');

const router = express.Router();

const validations = require('../validations/admins');

router.post('/', validations.validateCreation);
