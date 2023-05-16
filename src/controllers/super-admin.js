const superAdmin = require('../models/Super-Admin');

const createSuperAdmin = (req, res) => {
  const {
    email, password,
  } = req.body;
  superAdmin.create({
    email,
    password,
  })
    .then((result) => res.status(201).json({
      message: 'Super Admin created',
      result,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error ocurred',
      error,
    }));
};

const getAllSuperAdmin = (req, res) => {
  superAdmin.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'This are all the super-admin',
          data,
        });
      }
    })
    .catch((error) => res.status(404).json({
      message: 'Error, a problem has occurred',
      error,
    }));
};

const getSuperAdminById = (req, res) => {
  const { id } = req.params;

  superAdmin.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Super Admin Found',
          data,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Super Admin not found',
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

module.exports = { createSuperAdmin, getAllSuperAdmin, getSuperAdminById };
