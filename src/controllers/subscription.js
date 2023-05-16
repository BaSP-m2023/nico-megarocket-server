const subscription = require('../models/Subscription');

const getAllSubscriptions = (req, res) => {
  subscription.find()
    .then((subscriptions) => {
      res.status(200).json({
        message: 'here is the subscriptions list',
        data: subscriptions,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'there is an error here',
        error,
      });
    });
};
const getSubscriptionById = (req, res) => {
  const Id = req.params.id;
  subscription.findById(Id)
    .then((subscriptions) => {
      res.status(200).json({
        message: `subcription ${Id} was found`,
        data: subscriptions,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'there is an error here',
        error,
      });
    });
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
};
