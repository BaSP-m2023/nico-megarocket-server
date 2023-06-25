const subscription = require('../models/Subscription');

const createSubscription = async (req, res) => {
  const {
    classId, members, date,
  } = req.body;

  try {
    const result = await subscription.create({
      classId, members, date,
    });

    return res.status(201).json({
      message: 'Subscription Created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'it cannot be created',
      data: null,
      error,
    });
  }
};

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const {
    classId, members, date,
  } = req.body;

  try {
    const result = await subscription.findByIdAndUpdate(
      id,
      {
        classId, members, date,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Subscription with the id: ${id} was not found, please try with another one`,
        data: null,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Subscription Updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating Subscription',
      data: null,
      error,
    });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const allClasses = await subscription.find()
      .populate('classId')
      .populate('members');

    return res.status(200).json({
      message: 'here is the subscription list',
      data: allClasses,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'there is an error here',
      data: null,
      error,
    });
  }
};

const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await subscription.findById(id)
      .populate('members')
      .populate('classId');

    if (result) {
      return res.status(200).json({
        message: 'Subscription was found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Subscription not found',
      data: null,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'there is an error here',
      error,
    });
  }
};

const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await subscription.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Subscription with the id: ${id} was not found, please try with another one`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription deleted.',
      data: null,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Oops! There was an error!',
      data: null,
      error,
    });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
};
