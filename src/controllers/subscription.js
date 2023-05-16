const subscription = require('../models/Subscription');

const createSubscription = (req, res) => {
  const {
    classId, members, date,
  } = req.body;
  subscription.create({
    classId,
    members,
    date,
  })
    .then((result) => res.status(201).json({
      message: 'Subscription created',
      result,
    }))
    .catch((error) => res.status(400).json({
      message: 'Error ocurred',
      error,
    }));
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;

  subscription.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Subscription with the id: ${id} was not found, please try with another one`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Subscription with the id: ${id} was successfully deleted.`,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'Oops! There was an error!',
      error,
    }));
};

module.exports = {
  createSubscription,
  deleteSubscription,
};
