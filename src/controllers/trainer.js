const trainers = require('../models/Trainer');

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
    .catch((error) => res.status(404).json({
      message: 'Error, a problem has occurred',
      error,
    }));
};

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
        res.status(404).json({
          message: 'Trainer not found',
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

const updateTrainer = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;

  trainers.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      salary,
      isActive,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          msg: `The id ${id} was not found`,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(500).json(error));
};

const deleteTrainer = (req, res) => {
  const { id } = req.params;

  trainers.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Trainer with the id: ${id} was not found, please try with another one`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Trainer with the id: ${id} was successfully deleted.`,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'There was an mistake!',
      error,
    }));
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
