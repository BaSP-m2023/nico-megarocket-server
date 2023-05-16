const superAdmin = require('../models/Super-admin');

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
    .catch((error) => res.status(500).json({
      message: 'Error ocurred',
      error,
    }));
};

module.exports = { createSuperAdmin };
