const express = require('express');

const users = require('../data/class.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (!users.lenght) {
    return res.status(404).send('classes not found');
  }
  return res.send(users);
});

module.exports = router;
