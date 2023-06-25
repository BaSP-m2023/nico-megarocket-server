const trainer = require('../models/Trainer');
const firebaseApp = require('../helper/firebase');

const getAllTrainers = (req, res) => {
  trainer.find()
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: 'This are all our trainer',
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

  trainer.findById(id)
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

const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;

  try {
    const existingTrainer = await trainer.findOne({ _id: id });

    if (!existingTrainer) {
      return res.status(404).json({
        message: 'This Trainer does not exists',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingTrainer;

    await firebaseApp.auth().updateUser(firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const result = await trainer.findByIdAndUpdate(id, {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      salary,
      isActive,
    }, { new: true });

    if (!result) {
      return res.status(404).json({
        message: `The id ${id} was not found`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer Updated',
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

const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const existingTrainer = await trainer.findOne({ id });

    if (existingTrainer) {
      return res.status(404).json({
        message: 'This Trainer does not exists',
        data: null,
        error: true,
      });
    }
    const { firebaseUid } = existingTrainer;

    await firebaseApp.auth().deleteUser(firebaseUid);

    const result = await trainer.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Trainer with ID ${id} not found`,
        data: null,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer deleted!',
      data: null,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server Error',
      data: null,
      error: true,
    });
  }
};

const postTrainer = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;

  let firebaseUid;
  try {
    const existingTrainer = await trainer.findOne({ email });

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

    const result = await trainer.create({
      firebaseUid,
      firstName,
      lastName,
      email,
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
      message: error,
      data: null,
      error: true,
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
