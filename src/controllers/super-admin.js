const superAdmin = require('../models/SuperAdmin');

const getAllSuperAdmin = (req, res) => {
  superAdmin.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'This are all the super admin',
          data,
        });
      }
    })
    .catch((error) => res.status(500).json({
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

module.exports = { getAllSuperAdmin, getSuperAdminById };
