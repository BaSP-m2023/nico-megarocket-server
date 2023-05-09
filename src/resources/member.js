const express = require('express');

const fs = require('fs');

const members = require('../data/member.json');

const apiMembers = express.Router();

// const router = express.Router();

// Get by ID
apiMembers.get('/getById/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('There is not any member with that ID!');
  }
});

apiMembers.post('/post', (req, res) => {
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
apiMembers.delete('/deleteById/:id', (req, res) => {
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

// module.exports = router;

// Get member list
apiMembers.get('/get', (req, res) => {
  if (members.length) {
    res.status(200).json({
      data: members,
    });
  } else {
    res.status(200).json({ msg: 'empty member list' });
  }
});

// Put member list

apiMembers.put('/put/:id', (req, res) => {
  const idParam = req.params.id;
  const newName = req.body.first_name;
  const newLastName = req.body.last_name;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const newBirthdate = req.body.birthdate;
  const newCity = req.body.city;
  const newAddress = req.body.adress;
  const newPhone = req.body.phone;
  const newMemberships = req.body.memberships;
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const birthdateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  const cityRegex = /^[A-Za-z ]+$/;
  const addressRegex = /^[A-Za-z0-9\s,'-]*$/;
  const phoneRegex = /^[0-9]{10}$/;
  const membershipRegex = /^(classic|basic|black)$/;

  const memberExists = members.some((member) => member.id === parseInt(idParam, 10));

  if (memberExists) {
    const member = members.find((index) => index.id === parseInt(idParam, 10));
    if (newName) {
      member.first_name = nameRegex.test(newName)
        ? newName
        : res.status(400).json({ msg: 'invalid name format' });
    }
    if (newLastName) {
      member.last_name = nameRegex.test(newLastName)
        ? newLastName
        : res.status(400).json({ msg: 'invalid lastName format' });
    }
    if (newEmail) {
      member.email = emailRegex.test(newEmail)
        ? newEmail
        : res.status(400).json({ msg: 'invalid email format' });
    }
    if (newPassword) {
      member.password = passwordRegex.test(newPassword)
        ? newPassword
        : res.status(400).json({ msg: 'invalid password format' });
    }
    if (newBirthdate) {
      member.birthdate = birthdateRegex.test(newBirthdate)
        ? newBirthdate
        : res.status(400).json({ msg: 'invalid birthdate format' });
    }
    if (newCity) {
      member.city = cityRegex.test(newCity)
        ? newCity
        : res.status(400).json({ msg: 'invalid city format' });
    }
    if (newAddress) {
      member.adress = addressRegex.test(newAddress)
        ? newAddress
        : res.status(400).json({ msg: 'invalid address format' });
    }
    if (newPhone) {
      member.phone = phoneRegex.test(newPhone)
        ? newPhone
        : res.status(400).json({ msg: 'invalid phone format' });
    }
    if (newMemberships) {
      member.memberships = membershipRegex.test(newMemberships)
        ? newMemberships
        : res.status(400).json({ msg: 'invalid memberships format' });
    }

    fs.writeFileSync('./src/data/member.json', JSON.stringify(members));

    res.status(201).json({ msg: 'Member updated', member });
  } else {
    res.status(404).json({ msg: `Member ID ${idParam} not found` });
  }
});

export default apiMembers;
