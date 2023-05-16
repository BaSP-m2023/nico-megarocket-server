const Admin = require('../models/Admins');

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
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
      message: 'Error occurred while updating admin',
      error,
    }));
};

module.exports = { updateAdmin };
