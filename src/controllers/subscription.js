const subscription = require('../models/Subscription');

const updateSuscription = (req, res) => {
  const { id } = req.params;
  const {
    classId, members, date,
  } = req.body;

  subscription.findByIdAndUpdate(
    id,
    {
      classId,
      members,
      date,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Subscription with the id: ${id} was not found, please try with another one`,
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Subscription updated successfully',
        result,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'Error updating suscription',
      error,
    }));
};
module.exports = {
  updateSuscription,
};
