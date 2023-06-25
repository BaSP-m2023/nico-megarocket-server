const classes = require('../models/Class');

const getClasses = (req, res) => {
  classes.find()
    .populate('trainer')
    .populate('activity')
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Classes list',
          data: result,
          error: false,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

const getClassById = (req, res) => {
  const { id } = req.params;

  classes.findById(id)
    .populate('trainer')
    .populate('activity')
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Class found',
          data: result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
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
          message: 'Class updated',
          data: result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: true,
    }));
};

const deleteClass = (req, res) => {
  const { id } = req.params;
  classes.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'Class deleted',
          data: result,
          error: false,
        });
      } else {
        res.status(404).json({
          message: 'Class not found',
          data: null,
          error: true,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: error,
      data: null,
      error: false,
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
    .then((result) => {
      res.status(201).json({
        message: 'Class created',
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

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
