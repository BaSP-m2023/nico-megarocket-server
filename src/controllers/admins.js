const Admin = require('../models/Admins');

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  Admin.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with ID ${id} not found`,
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin updated!',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

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
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};
const getAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({
      message: 'Admins list.',
      data: admins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
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
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;

  Admin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with ID ${id} not found`,
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin deleted!',
        data: null,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

module.exports = {
  createAdmin,
  getAdmins,
  getAdminsById,
  updateAdmin,
  deleteAdmin,
};
