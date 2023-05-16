const sAdmins = require('../models/SuperAdmin');

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    email, password,
  } = req.body;

  sAdmins.findByIdAndUpdate(
    id,
    {
      email,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `The id ${id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(500).json(error));
};

module.exports = { updateAdmin };
