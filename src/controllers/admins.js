const Admin = require('../models/Admins');

const createAdmin = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
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
const getAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({
      message: 'Obtained all the admins from the list.',
      data: admins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'Error in the server.',
      error,
    }));
};

const getAdminsById = (req, res) => {
  const { id } = req.params;
  Admin.findById(id)
    .then((admin) => {
      if (admin) {
        res.status(200).json({
          message: 'Admin found',
          data: admin,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Admin not found',
        });
      }
    })
    .catch((error) => res.status(400).json({
      message: 'Error in the request',
      error,
    }));
};

module.exports = { createAdmin, getAdmins, getAdminsById };
