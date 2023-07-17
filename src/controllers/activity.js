const activity = require('../models/Activity');

const getAllActivities = async (req, res) => {
  try {
    const activities = await activity.find();

    return res.status(200).json({
      message: 'Activities list',
      data: activities,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};
const getActivityById = async (req, res) => {
  const Id = req.params.id;

  try {
    const result = await activity.findById(Id);

    if (result) {
      return res.status(200).json({
        message: 'Activity found',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Activity not found',
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
  const {
    name, isActive, description, picture,
  } = req.body;

  try {
    const result = await activity.create({
      name,
      isActive,
      description,
      picture,
    });

    return res.status(201).json({
      message: 'Activity Created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const updateActivity = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, isActive, picture,
  } = req.body;

  try {
    const result = await activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        isActive,
        picture,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: 'Activity not found',
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Activity Updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: null,
      error: true,
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await activity.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: 'Activity not found',
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
      message: error,
      data: null,
      error: true,
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
