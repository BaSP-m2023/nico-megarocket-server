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

module.exports = {
  createSubscription,
};
