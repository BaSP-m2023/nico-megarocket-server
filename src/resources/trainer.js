import express from 'express';

import trainers from '../data/trainer.json';

const router = express.Router();
const fs = require('fs');

// GET
router.get('/', (req, res) => {
  res.send(trainers);
});

// PUT
router.put('/:id', (req, res) => {
  const newData = req.body; // Obtén los nuevos datos del cuerpo de la solicitud
  const trainerId = req.params.id;
  const foundTrainer = trainers.findIndex((trainer) => trainer.id.toString() === trainerId);

  // Validate empty fields
  const emptyFields = Object.keys(newData).filter((key) => newData[key] === '');
  if (emptyFields.length > 0) res.send(`Error: Fields '${emptyFields.join(', ')}' cannot be empty`);

  if (!foundTrainer) {
    res.send('Trainer not found!');
  } else {
    trainers[foundTrainer] = { ...trainers[foundTrainer], ...newData };

    // write the changes in trainer.JSON
    fs.writeFile('./src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
      if (err) {
        res.send('Error updating trainer data');
      } else {
        res.send(`Trainer id ${trainerId} data updated successfully `);
      }
    });
  }
});

export default router;
