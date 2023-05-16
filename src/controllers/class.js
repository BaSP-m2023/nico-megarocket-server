const classes = require('../models/Class');

const getClasses = (req, res) => {
  classes.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'All classes',
          data,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;

  classes.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Class Found',
          data,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};
const updateClass = (req, res) => {
  const { id } = req.params;

  const {
    hour,
    day,
    trainer,
    activity,
    slots,
  } = req.body;

  classes.findByIdAndUpdate(
    id,
    {
      hour,
      day,
      trainer,
      activity,
      slots,
    },
    { new: true },
  )
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: 'Class Updated',
          result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred',
      error,
    }));
};

const createClass = (req, res) => {
  const {
    hour, day, trainer, activity, slots,
  } = req.body;

  classes.create({
    hour,
    day,
    trainer,
    activity,
    slots,
  })
    .then((data) => {
      res.status(201).json({
        message: 'Class created',
        data,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error,
      });
    });
};

// test eslint

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
};
