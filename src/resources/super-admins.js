const express = require('express');
const fs = require('fs');
const sAdmins = require('../data/super-admins.json');

const router = express.Router();

// GET
router.get('/get', (req, res) => {
  if (sAdmins.length === 0) res.send('The super admin list is empty.');
  res.send(sAdmins);
});

// GET BY ID
router.get('/getById/:id', (req, res) => {
  const sAdminId = req.params.id;
  const foundSAdmin = sAdmins.find(
    (sAdmin) => sAdmin.id.toString() === sAdminId,
  );
  if (foundSAdmin) {
    res.send(foundSAdmin);
  } else {
    res.send('Super admin not found');
  }
});

// POST
router.post('/post', (req, res) => {
  const newSAdmin = req.body;
  const emptyFields = Object.keys(newSAdmin).filter(
    (key) => newSAdmin[key] === '',
  );
  if (emptyFields.length > 0) {
    res.send('Fields cant be empty');
    return;
  }
  sAdmins.push(newSAdmin);
  fs.writeFile(
    'src/data/super-admins.json',
    JSON.stringify(sAdmins, null, 2),
    (err) => {
      if (err) {
        res.send('Super admin cant be created');
      } else {
        res.send('Super admin created');
      }
    },
  );
});

// DELETE
router.delete('/delete/:id', (req, res) => {
  const sAdminsId = req.params.id;
  const sAdminToDelete = sAdmins.find(
    (superAdmin) => superAdmin.id.toString() === sAdminsId,
  );
  if (!sAdminToDelete) {
    res.send('Super admin not found');
    return;
  }
  const newSuperAdminsList = sAdmins.filter(
    (superAdmin) => superAdmin.id.toString() !== sAdminsId,
  );
  fs.writeFile(
    'src/data/super-admins.json',
    JSON.stringify(newSuperAdminsList, null, 2),
    (err) => {
      if (err) {
        res.send('Super admin cant be delete');
      } else {
        res.send('Super admin delete');
      }
    },
  );
});

// PUT
router.put('/put/:id', (req, res) => {
  const sAdminId = req.params.id;

  const newSAdmin = req.body;
  const emptyFields = Object.keys(newSAdmin).filter(
    (key) => newSAdmin[key] === '',
  );
  if (emptyFields.length > 0) {
    res.send('Fields cant be empty');
    return;
  }
  const found = sAdmins.findIndex(
    (superAdmin) => JSON.stringify(superAdmin.id) === sAdminId,
  );
  if (found >= 0) {
    sAdmins[found] = { ...sAdmins[found], ...newSAdmin };
    fs.writeFile(
      './src/data/super-admins.json',
      JSON.stringify(sAdmins, null, 2),
      (err) => {
        if (err) {
          res.send('Id does not match any admin');
        } else {
          res.send('Super admin updated');
        }
      },
    );
  }
});

module.exports = router;
