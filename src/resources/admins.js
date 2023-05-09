const express = require('express');
const fs = require('fs');
const adminsUser = require('../data/admins.json');

const router = express.Router();

router.get('/get', (req, res) => {
  if (adminsUser.length === 0) {
    res.send('No admins list no found');
  } else {
    res.send(adminsUser);
  }
});

router.put('/put/:id', (req, res) => {
  const idParam = req.params.id;
  const { body } = req;
  const regex = /^[0-9]+$/;
  // eslint-disable-next-line radix
  const search = adminsUser.find((admins) => admins.id === parseInt(idParam));
  if (regex.test(idParam)) {
    // eslint-disable-next-line no-console
    console.log('Admin user id valid.');
  } else {
    res.status(404).send('Admin user id not valid. Only numbers.');
    return;
  }
  if (!search) {
    // eslint-disable-next-line consistent-return
    return res.status(404).send('User not found');
  }
  search.first_name = body.first_name;
  search.last_name = body.last_name;
  search.email = body.email;
  search.address = body.address;
  search.phone = body.phone;
  fs.writeFile('src/data/admins.json', JSON.stringify(adminsUser, null, 2), (error) => {
    if (error) {
      return res.send('User cannot be edited');
    }
    return res.send('user has been edited');
  });
});

module.exports = router;
