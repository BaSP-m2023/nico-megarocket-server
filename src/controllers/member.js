const Member = require('../models/Member');
const firebaseApp = require('../helper/firebase');

const createMember = async (req, res) => {
  const {
    firstName,
    lastName,
    dni,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership,
  } = req.body;

  let firebaseUid;

  try {
    const existingMember = await Member.findOne({ email });
    const existingDNIMember = await Member.findOne({ dni });

    if (existingMember) {
      return res.status(400).json({
        message: 'Email already exists',
        data: null,
        error: true,
      });
    }

    if (existingDNIMember) {
      return res.status(400).json({
        message: 'This DNI is registered',
        data: null,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'MEMBER' });

    const result = await Member.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      birthday,
      phone,
      email,
      city,
      postalCode,
      isActive,
      membership,
    });

    return res.status(201).json({
      message: 'Member created',
      data: result,
      error: false,
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error collection')) {
      return res.status(400).json({
        message: 'Email already exists',
        data: null,
        error: true,
      });
    }
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    dni,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership,
  } = req.body;

  try {
    const existingMember = await Member.findOne({ _id: id });

    if (!existingMember) {
      return res.status(404).json({
        message: 'Member not found',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingMember;

    await firebaseApp.auth().updateUser(firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const result = await Member.findByIdAndUpdate(id, {
      firstName,
      lastName,
      dni,
      birthday,
      phone,
      email,
      city,
      postalCode,
      isActive,
      membership,
    }, { new: true });

    if (!result) {
      return res.status(404).json({
        message: 'Member not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member updated',
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

const getAllMembers = async (req, res) => {
  try {
    const result = await Member.find();

    return res.status(200).json({
      message: 'Members list',
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

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Member.findById(id);

    if (result) {
      return res.status(200).json({
        message: 'Member found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Member not found',
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

const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const existingMember = await Member.findOne({ _id: id });

    if (!existingMember) {
      return res.status(404).json({
        message: 'Member not found',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingMember;

    await firebaseApp.auth().deleteUser(firebaseUid);

    const result = await Member.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Member not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member deleted',
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
  updateMember,
  deleteMember,
  createMember,
  getAllMembers,
  getById,
};
