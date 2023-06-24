const Admin = require('../models/Admins');
const firebaseApp = require('../helper/firebase');

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

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city,
  } = req.body;

  let firebaseUid;
  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: 'This email is already used',
        data: null,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const result = await Admin.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
    });

    return res.status(201).json({
      message: 'Admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};
const getAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({
      message: 'Obtained all the admins from the list.',
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
