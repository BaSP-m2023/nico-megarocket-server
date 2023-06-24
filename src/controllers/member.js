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

    if (existingMember) {
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
      message: 'Member created successfuly',
      data: result,
      error: false,
    });
  } catch (error) {
    if (error.message.includes('E11000 duplicate key error collection')) {
      return res.status(400).json({
        message: 'Email already exists',
        error,
      });
    }
    return res.status(500).json({
      message: 'An error ocurred',
      data: null,
      error: true,
    });
  }
};

const updateMember = (req, res) => {
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

  Member.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(201).json(result);
    })
    .catch((error) => res.status(500).json(error));
};

const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => res.status(200).json({
      message: 'Complete members list',
      data: members,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Member.findById(id)
    .then((member) => {
      if (member) {
        res.status(200).json({
          message: 'Member found!',
          data: member,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Member not found',
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const existingMember = await Member.findOne({ _id: id });

    if (!existingMember) {
      return res.status(404).json({
        message: 'This Member does not exists',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingMember;

    await firebaseApp.auth().deleteUser(firebaseUid);

    const result = await Member.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Member with ID ${id} not found`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member deleted!',
      data: null,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: true,
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
