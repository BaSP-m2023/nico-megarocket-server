const trainers = require('../models/Trainer');

const getAllTrainers = (req, res) => {
  trainers.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'Trainers list',
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
          message: 'Trainer found',
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
          message: 'Trainer not found',
          error: false,
        });
      }
      return res.status(201).json({
        message: 'Trainer updated',
        result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json(error));
};

const deleteTrainer = (req, res) => {
  const { id } = req.params;

  trainers.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: 'Trainer not found',
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Trainer deleted',
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'There was an mistake!',
      error,
    }));
};

const postTrainer = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;
  trainers.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    salary,
    isActive,
  })
    .then((result) => res.status(201).json({
      message: 'Trainer created',
      result,
    }))
    .catch((error) => {
      res.status(500).json({
        message: 'Trainer cannot be created',
        error,
      });
    });
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  postTrainer,
};
