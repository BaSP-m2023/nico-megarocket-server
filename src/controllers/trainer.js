const express = require('express');
const fs = require('fs');
const trainers = require('../data/trainer.json');
const Trainers = require('../models/Trainer');

const router = express.Router();

// Get all trainers
router.get('/', (_, res) => {
  if (trainers.length === 0) res.send('No trainers found'); res.send(trainers);
});

// Filter for activity (filter?activity=Yoga)
router.get('/filter', (req, res) => {
  const { activity } = req.query;

  let filterTrainers = trainers;

  if (activity) filterTrainers = filterTrainers.filter((trainer) => trainer.activity === activity);

  if (filterTrainers.length === 0) {
    res.status(404).send('No trainers found for the specified activity');
  } res.send(filterTrainers);
});

// Modify trainer
router.put('/:id', (req, res) => {
  const newData = req.body;
  const trainerId = req.params.id;
  const foundTrainer = trainers.findIndex((trainer) => trainer.id.toString() === trainerId);

  // Validate empty fields
  const emptyFields = Object.keys(newData).filter((key) => newData[key] === '');

  if (emptyFields.length > 0) {
    res.status(400).send(`Error: Fields '${emptyFields.join(', ')}' cannot be empty`);
    return;
  }

  if (foundTrainer < 0) {
    res.status(404).send('Trainer not found!');
    return;
  }

  trainers[foundTrainer] = { ...trainers[foundTrainer], ...newData };

  // write the changes in trainer.JSON
  fs.writeFile('./src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
    if (err) res.status(500).send('Error updating trainer data');
    res.send(`Trainer id ${trainerId} data updated successfully`);
  });
});

const updateTrainers = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, salary, isActive,
  } = req.body;

  Trainers.findByIdAndUpdate(
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
    .catch((error) => res.status(400).json(error));
};

module.exports = updateTrainers;
