const superAdmin = require('../models/SuperAdmin');
const firebaseApp = require('../helper/firebase');

const deleteSuperAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const existingSuperAdmin = await superAdmin.findOne({ _id: id });

    if (!existingSuperAdmin) {
      return res.status(404).json({
        message: 'This SuperAdmin does not exists',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingSuperAdmin;

    await firebaseApp.auth().deleteUser(firebaseUid);

    const result = await superAdmin.findByIdAndDelete(id);
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
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      data: null,
      error: true,
    });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    email,
  } = req.body;

  try {
    const existingSuperAdmin = await superAdmin.findOne({ _id: id });

    if (!existingSuperAdmin) {
      return res.status(404).json({
        message: 'This SuperAdmin does not exists',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingSuperAdmin;

    await firebaseApp.auth().updateUser(firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.findByIdAndUpdate(id, { email }, { new: true });

    if (!result) {
      return res.status(404).json({
        message: `The id ${id} was not found`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'SuperAdmin Updated',
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
    email,
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
      email,
    });
    return res.status(201).json({
      message: 'Super Admin created',
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
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        data: null,
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
