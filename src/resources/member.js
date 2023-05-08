const express = require('express');

const members = require('../data/member.json');

const apiMembers = express.Router();

// Get member list
apiMembers.get('/', (req, res) => {
  res.status(200).json({
    data: members,
  });
});

export default apiMembers;
