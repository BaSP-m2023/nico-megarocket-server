const activity = require('../models/Activity');

const getAllActivities = async (req, res) => {
  try {
    const activities = await activity.find();

    return res.status(200).json({
      message: 'here is the activities list',
      data: activities,
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
const getActivityById = async (req, res) => {
  const Id = req.params.id;

  try {
    const result = await activity.findById(Id);

    if (result) {
      return res.status(200).json({
        message: 'Activity was found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'activity not found',
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

const createActivity = async (req, res) => {
  const { name, isActive, description } = req.body;

  try {
    const result = await activity.create({
      name,
      isActive,
      description,
    });

    return res.status(201).json({
      message: 'Activity Created',
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

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, isActive,
  } = req.body;

  try {
    const result = await activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        isActive,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Activity with the id: ${id} was not found, please try with another one`,
        data: null,
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Activity Updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating Activity',
      data: null,
      error,
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await activity.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Activity with the id: ${id} was not found, please try with another one`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Activity deleted.',
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
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
