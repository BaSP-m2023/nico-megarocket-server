const express = require('express');
const fs = require('fs');
const sAdmins = require('../data/super-admins.json');

const router = express.Router();

// GET
router.get('/get', (req, res) => {
  if (sAdmins.length === 0) res.send('Admin not found');
  res.send(sAdmins);
});

// GET BY ID
router.get('/getById/:id', (req, res) => {
  const sAdminId = req.params.id;
  const foundSAdmin = sAdmins.find(
    (sAdmins) => sAdmins.id.toString() === sAdminId
  );
  if (foundSAdmin) {
    res.send(foundSAdmin);
  } else {
    res.send('Admin not found');
  }
});

// POST
router.post('/post', (req, res) => {
  const newAdmin = req.body;
  const emptyFields = Object.keys(newAdmin).filter(
    (key) => newAdmin[key] === ''
  );
  if (emptyFields.length > 0) {
    res.send('Fields cant be empty');
    return;
  }
  sAdmins.push(newAdmin);
  fs.writeFile(
    'src/data/super-admins.json',
    JSON.stringify(sAdmins, null, 2),
    (err) => {
      if (err) {
        res.send('Admin cant be created');
      } else {
        res.send('Admin created');
      }
    }
  );
});

// DELETE
router.delete('/delete/:id', (req, res) => {
  const sAdminsId = req.params.id;
  const filteredsAdmins = sAdmins.filter(
    (admin) => admin.id.toString() !== sAdminsId
  );
  fs.writeFile(
    'src/data/super-admins.json',
    JSON.stringify(filteredsAdmins, null, 2),
    (err) => {
      if (err) {
        res.send('Admin cant be delete');
      } else {
        res.send('Admin delete');
      }
    }
  );
});

// PUT
router.put('/put/:id', (req, res) => {
  const sAdminsId = req.params.id;
  const newAdmin = req.body;
  const emptyFields = Object.keys(newAdmin).filter(
    (key) => newAdmin[key] === ''
  );
  if (emptyFields.length > 0) {
    res.send('Fields cant be empty');
    return;
  }
  console.log(req.body);
  const found = sAdmins.findIndex(
    (admin) => JSON.stringify(admin.id) === sAdminsId
  );
  if (found >= 0) {
    sAdmins[found] = { ...sAdmins[found], ...newAdmin };
    fs.writeFile(
      './src/data/super-admins.json',
      JSON.stringify(sAdmins, null, 2),
      (err) => {
        if (err) {
          res.send('Id does not match any admin');
        } else {
          res.send('Admin updated');
        }
      }
    );
  }
});

module.exports = router;
