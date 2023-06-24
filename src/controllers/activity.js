const activity = require('../models/Activity');

const getAllActivities = (req, res) => {
  activity.find()
    .then((activities) => {
      res.status(200).json({
        message: 'Activities list',
        data: activities,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'there is an error here',
        data: null,
        error,
      });
    });
};
const getActivityById = (req, res) => {
  const Id = req.params.id;
  activity.findById(Id, 'name description')
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Activity found',
          data: result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Activity not found',
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'there is an error here',
        error,
      });
    });
};

const createActivity = (req, res) => {
  const { name, isActive, description } = req.body;
  activity.create({
    name,
    isActive,
    description,
  })
    .then((result) => {
      res.status(201).json({
        message: 'Activity created',
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'it cannot be created',
        data: null,
        error,
      });
    });
};

const updateActivity = (req, res) => {
  const { id } = req.params;
  const {
    name, description, isActive,
  } = req.body;

  activity.findByIdAndUpdate(
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
          message: 'Activity not found',
          data: null,
          error: true,
        });
      }
      return res.status(201).json({
        message: 'Activity updated',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'Error updating Activity',
      data: null,
      error,
    }));
};

const deleteActivity = (req, res) => {
  const { id } = req.params;
  activity.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Activity not found',
          data: null,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Activity deleted',
        data: null,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'Oops! There was an error!',
      data: null,
      error,
    }));
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
