const trainers = require('../models/trainer');

const getAllTrainers = (req, res) => {
  trainers.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'This are all our trainers',
          data,
        });
      }
    })
    .catch((error) => res.status(500).json({
      message: 'Error, a problem has occurred',
      error,
    }));
};

// Get trainers by id
const getTrainerById = (req, res) => {
  const { id } = req.params;

  trainers.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Trainer Found',
          data,
          error: false,
        });
      } else {
        res.status(500).json({
          message: 'Class not found',
          error: true,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        error: error.msg,
      });
    });
};

module.exports = { getAllTrainers, getTrainerById };
