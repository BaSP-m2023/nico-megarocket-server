const Admin = require('../models/Admins');
const firebaseApp = require('../helper/firebase');

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, picture,
  } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ _id: id });

    if (!existingAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingAdmin;

    await firebaseApp.auth().updateUser(firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const result = await Admin.findByIdAndUpdate(id, {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      picture,
    }, { new: true });

    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin Updated',
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

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, picture,
  } = req.body;

  let firebaseUid;
  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Email already exists',
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
      picture,
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
const getAdmins = async (req, res) => {
  try {
    const result = await Admin.find();

    return res.status(200).json({
      message: 'Admins list',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'there is an error here',
      data: null,
      error,
    });
  }
};

const getAdminsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Admin.findById(id);

    if (result) {
      return res.status(200).json({
        message: 'Admin found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Admin not found',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const existingAdmin = await Admin.findOne({ _id: id });

    if (!existingAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingAdmin;

    await firebaseApp.auth().deleteUser(firebaseUid);

    const result = await Admin.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Admin not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin deleted',
      data: null,
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

module.exports = {
  createAdmin,
  getAdmins,
  getAdminsById,
  updateAdmin,
  deleteAdmin,
};
