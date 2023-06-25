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
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
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
          message: 'Subscription not found',
          data: null,
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Subscription updated',
        data: result,
        error: true,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

const getAllSubscriptions = (req, res) => {
  subscription.find()
    .populate('members')
    .populate('classId')
    .then((result) => {
      res.status(200).json({
        message: 'Subscriptions list',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
        data: null,
        error: true,
      });
    });
};

const getSubscriptionById = (req, res) => {
  const Id = req.params.id;
  subscription.findById(Id)
    .populate('members')
    .populate('classId')
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Subscription found',
          data: result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Subscription not found',
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
        data: null,
        error: true,
      });
    });
};

const deleteSubscription = (req, res) => {
  const { id } = req.params;

  subscription.findByIdAndDelete(id)

    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Subscription not found',
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Subscription deleted',
        data: null,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
