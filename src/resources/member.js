const express = require('express');

const fs = require('fs');

const members = require('../data/member.json');

const apiMembers = express.Router();

// Get member list
apiMembers.get('/', (req, res) => {
  res.status(200).json({
    data: members,
  });
});

// Put member list

apiMembers.put('/:id', (req, res) => {
  const idParam = req.params.id;
  const newName = req.body.first_name;
  const newLastName = req.body.last_name;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newBirthdate = req.body.birthdate;
  const newCity = req.body.city;
  const newAdress = req.body.adress;
  const newPhone = req.body.phone;
  const newMemberships = req.body.memberships;

  const memberExists = members.some((member) => member.id === parseInt(idParam, 10));

  if (memberExists) {
    const member = members.find((index) => index.id === parseInt(idParam, 10));

    member.first_name = newName || member.first_name;
    member.last_name = newLastName || member.last_name;
    member.email = newEmail || member.email;
    member.password = newPassword || member.password;
    member.birthdate = newBirthdate || member.birthdate;
    member.city = newCity || member.city;
    member.adress = newAdress || member.adress;
    member.phone = newPhone || member.phone;
    member.memberships = newMemberships || member.memberships;

    fs.writeFileSync('./src/data/member.json', JSON.stringify(members));

    res.status(201).json({ msg: 'Member updated', member });
  } else {
    res.status(404).json({ msg: `Member ID ${idParam} not found` });
  }
});

export default apiMembers;
