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
    .catch((error) => res.status(500).json({
      message: 'Error ocurred',
      error,
    }));
};

const updateSubscription = (req, res) => {
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
      return res.status(200).json({
        message: 'Subscription updated successfully',
        result,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'Error updating suscription',
      error,
    }));
};

const getAllSubscriptions = (req, res) => {
  subscription.find()
    .populate('members')
    .populate('classId')
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
    .populate('members')
    .populate('classId')
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
    .catch((error) => res.status(500).json({
      message: 'Oops! There was an error!',
      error,
    }));
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
