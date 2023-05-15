const activity = require('../models/activity');

const getAllActivities = (req, res) => {
  activity.find()
    .then((activities) => {
      res.status(200).json({
        message: 'here is the activities list',
        data: activities,
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
const getActivityById = (req, res) => {
  const Id = req.params.id;
  activity.findById(Id, 'name description')
    .then((activities) => {
      res.status(200).json({
        message: `activity ${activities.name} was found`,
        data: activities,
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
// const Activity = require('../models/Activity'); that was mi code before the PULL,with "A"ctivity

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
          message: `Activity with the id: ${id} was not found, please try with another one`,
          error: true,
        });
      }
      return res.status(201).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  getAllActivities,
  getActivityById,
  updateActivity,
};
