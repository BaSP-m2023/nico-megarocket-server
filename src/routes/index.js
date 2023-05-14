const express = require('express');

const router = express.Router();

const trainer = require('./trainer');

router.use('/trainer', trainer);

module.exports = router;
