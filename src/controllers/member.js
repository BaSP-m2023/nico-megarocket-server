const Member = require('../models/Member');

const createMember = (req, res) => {
  const {
    firstName,
    lastName,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership,
  } = req.body;

  Member.create({
    firstName,
    lastName,
    birthday,
    phone,
    email,
    city,
    postalCode,
    isActive,
    membership,
  })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
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
    .then((member) => res.status(200).json({
      message: 'Member found!',
      data: member,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  createMember,
  getAllMembers,
  getById,
};
