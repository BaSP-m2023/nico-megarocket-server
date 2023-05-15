const Activity = require('../models/Activity');

const updateActivity = (req, res) => {
  const { id } = req.params;
  const {
    name, description, isActive,
  } = req.body;

  Activity.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Activity with the id: ${id} was not found, please try with another one`,
          error: true,
        });
      }
      return res.status(201).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  updateActivity,
};
