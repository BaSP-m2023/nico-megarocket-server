const Member = require('../models/Member');

const createMember = (req, res) => {
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

  Member.create({
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
  })
    .then((result) => res.status(201).json({
      message: 'Member created successfuly',
      data: result,
      error: false,
    }))
    .catch((error) => {
      if (error.message.includes('E11000 duplicate key error collection')) {
        return res.status(400).json({
          message: 'Email already exists',
          error,
        });
      }
      return res.status(500).json({
        message: 'An error ocurred',
        error,
      });
    });
};

const updateMember = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, birthday, phone, email, city, postalCode, isActive, membership,
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
      message: 'Members list',
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
          message: 'Member found',
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
  try {
    const { id } = req.params;

    const memberExist = await Member.findById(id);

    if (!memberExist) {
      return res.status(404).send('ID was not found');
    }

    await Member.findByIdAndDelete(id);

    res.send('Member has been deleted');
  } catch (error) {
    res.status(500).send('Member could not be deleted');
  }
  return null;
};

module.exports = {
  updateMember,
  deleteMember,
  createMember,
  getAllMembers,
  getById,
};
