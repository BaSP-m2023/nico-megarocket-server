const trainers = require('../models/Trainer');
const firebaseApp = require('../helper/firebase');

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

const postTrainer = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;

  let firebaseUid;
  try {
    const existingTrainer = await trainers.findOne({ email });

    if (existingTrainer) {
      return res.status(400).json({
        message: 'This email is already used',
        data: null,
        error: true,
      });
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    firebaseUid = newFirebaseUser.uid;

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'TRAINER' });

    const result = await trainers.create({
      firebaseUid,
      firstName,
      email,
      lastName,
      dni,
      phone,
      city,
      salary,
      isActive,
    });

    return res.status(201).json({
      message: 'Trainer created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Trainer cannot be created',
      data: null,
      error: error.msg,
    });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  postTrainer,
};
