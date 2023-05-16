const Member = require('../models/Member');

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
};
