const Admin = require('../models/Admins');

const updateAdmin = (req, res) => {
  const adminId = req.params.id;
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
    adminId,
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
          message: `Admin with ID ${adminId} not found`,
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
    .catch((error) => res.status(400).json({
      message: 'Error occurred while updating admin',
      error,
    }));
};

module.exports = { updateAdmin };
