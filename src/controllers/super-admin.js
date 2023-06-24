const superAdmin = require('../models/SuperAdmin');

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;

  superAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Super Admin not found',
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super Admin deleted',
        data: null,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    email, password,
  } = req.body;

  superAdmin.findByIdAndUpdate(
    id,
    {
      email,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Super Admin not found',
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Super Admin updated',
        result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

const getAllSuperAdmin = (req, res) => {
  superAdmin.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Super admins list',
          data,
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
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

const getSuperAdminById = (req, res) => {
  const { id } = req.params;

  superAdmin.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Super Admin found',
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

module.exports = {
  createSuperAdmin,
  getAllSuperAdmin,
  getSuperAdminById,
  updateAdmin,
  deleteSuperAdmin,
};
