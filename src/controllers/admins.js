/*

const express = require('express')
const adminsUser = require('../data/admins.json')
const fs = require('fs')
const router = express.Router ()

const Admin = require('../models/Admins');

const createAdmin = (req, res) => {
  const
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
    } = req.body;
  Admin.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((result) => res.status(201).json({
      message: 'Admin created',
      result,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error ocurred',
      error,
    }));
};

router.put ('/put/:id', (req, res)=>{
    const idParam = req.params.id
    const body = req.body
    const regex = /^[0-9]+$/;
    const search = adminsUser.find((admins) => admins.id === parseInt(idParam));
    if (regex.test(idParam)) {
        console.log('Admin user id valid.');
    } else {
        res.status(404).send('Admin user id not valid. Only numbers.')
        return
    }
    if (!search) {
        return res.status(404).send('User not found');
    }
    search.first_name=body.first_name
    search.last_name=body.last_name
    search.email=body.email
    search.address=body.address
    search.phone=body.phone
    fs.writeFile('src/data/admins.json', JSON.stringify(adminsUser, null, 2), (error) => {
        if (error) {
        return res.send('User cannot be edited');
        } else {
        return res.send('user has been edited');
        }
  });
})
module.exports=router
module.exports = { createAdmin };
*/
