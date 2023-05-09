import express from 'express';

import trainers from '../data/trainer.json';

const router = express.Router();
const fs = require('fs');

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

export default router;
