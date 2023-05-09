const express = require('express');
const fs = require('fs');

const classes = require('../data/class.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (!classes.lenght) {
    return res.status(200).send('there are no classes');
  }
  return res.send(classes);
});

router.put('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((idClass) => idClass.id.toString() === classId);
  if (foundClass) {
    const updClass = req.body;
    classes.forEach((classes2) => {
      if (classes2.id.toString() === classId) {
        const newClass = classes2;
        newClass.time = updClass.time ? updClass.time : newClass.time;
        newClass.trainer = updClass.trainer ? updClass.trainer : newClass.trainer;
        newClass.hour = updClass.hour ? updClass.hour : newClass.hour;
        newClass.activity = updClass.activity ? updClass.activity : newClass.activity;

        fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
          if (err) {
            res.status(400).json({ msg: 'Error! Class cant be updated' });
          } else {
            res.status(200).json({ msg: 'Class updated' });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `Class not found with the id ${req.params.id}` });
  }
});

module.exports = router;
