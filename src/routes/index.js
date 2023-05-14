const express = require('express');
const trainerRoutes = require('./trainer');

const router = express.Router();

const classes = require('./class');

router.use('/class', classes);
router.use('/trainer', trainerRoutes);
module.exports = router;
