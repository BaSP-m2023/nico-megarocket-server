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

module.exports = {
  createMember,
};
