const superAdmin = require('../models/SuperAdmin');
const firebaseApp = require('../helper/firebase');

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;

  superAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `SuperAdmin with ID ${id} not found`,
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'SuperAdmin deleted!',
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
          msg: `The id ${id} was not found`,
        });
      }
      return res.status(200).json(result);
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
          message: 'This are all the super admin',
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

const createSuperAdmin = async (req, res) => {
  const {
    firstName, email,
  } = req.body;

  let firebaseUid;
  try {
    const existingSuperAdmin = await superAdmin.findOne({ email });

    if (existingSuperAdmin) {
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

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const result = await superAdmin.create({
      firebaseUid,
      firstName,
      email,
    });
    return res.status(201).json({
      message: 'Super Admin created',
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      error: error.msg,
    });
  }
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

module.exports = {
  createSuperAdmin,
  getAllSuperAdmin,
  getSuperAdminById,
  updateAdmin,
  deleteSuperAdmin,
};
