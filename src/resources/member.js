const express = require('express');
const fs = require('fs');

const members = require('../data/member.json');

const router = express.Router();

// Get by ID
router.get('/getById/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('There is not any member with that ID!');
  }
});

router.post('/post', (req, res) => {
  const newMember = req.body;
  // valid empty fields
  const requiredFields = ['first_name', 'last_name', 'email', 'password', 'birthdate', 'city', 'address', 'phone',
    'memberships'];
  const missingFields = requiredFields.filter((field) => !newMember[field]);

  if (missingFields.length > 0) {
    res.send(`Missing fields: ${missingFields.join(', ')}`);
    return;
  }

  members.push(newMember);
  fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (error) => {
    if (error) {
      res.send('There was a mistake! Member cannot be created.');
    } else {
      res.send('Member created.');
    }
  });
});
// Delete by ID
router.delete('/deleteById/:id', (req, res) => {
  const memberId = req.params.id;
  const memberIndex = members.findIndex((member) => member.id.toString() === memberId);

  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);
    fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
      if (err) {
        res.send('There was a mistake! Member cannot be deleted.');
      } else {
        res.send('Member deleted.');
      }
    });
  } else {
    res.send('There is not any member with that ID!');
  }
});

module.exports = router;
