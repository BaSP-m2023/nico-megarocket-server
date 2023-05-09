const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const trainerId = req.params.id;
  if (!trainerId) {
    return res.status(400).send('Error! Trainer ID cannot be empty');
  }
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (foundTrainer) {
    return res.send(foundTrainer);
  }
  return res.send('Trainer not found!');
});

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const newTrainer = req.body;
  const emptyFields = Object.keys(newTrainer).filter((key) => newTrainer[key] === '');
  if (emptyFields.length > 0) {
    return res.status(400).send('Error! Fields cannot be empty');
  }
  trainers.push(newTrainer);
  fs.writeFile('./src/data/trainer.json', JSON.stringify(trainers), (err) => {
    if (err) {
      return res.status(500).send('Error! Trainer cannot be created');
    }
    return res.send('Trainer created');
  });
});

// eslint-disable-next-line consistent-return
router.delete('/:id', (req, res) => {
  const trainerId = req.params.id;
  if (!trainerId) {
    return res.status(400).send('Error! Trainer ID cannot be empty');
  }
  const filteredTrainers = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
  fs.writeFile('./src/data/trainer.json', JSON.stringify(filteredTrainers, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error! Trainer cannot be deleted');
    }
    return res.send('Trainer deleted');
  });
});

module.exports = router;
