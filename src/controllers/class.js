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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const valid = classes.filter((obj) => obj.id.toString() === id);

  if (!id || valid.length === 0) {
    res.status(404).send('Class not found');
  } else {
    res.send(valid);
  }
});

router.post('/:id', (req, res) => {
  const newClass = req.body;
  const { id } = newClass;
  const existingClass = classes.find((c) => c.id === id);

  if (existingClass) {
    res.status(409).send('Class already exists');
    return;
  }

  classes.push(newClass);
  fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (error) => {
    if (error) {
      res.status(500).send('Class cannot be created');
    } else {
      res.send('Class has been created');
    }
  });
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
            res.status(500).json({ msg: 'Error! Class cant be updated' });
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

router.delete('/:id', (req, res) => {
  const classDelete = req.params.id;

  const existClass = classes.find((sub) => sub.id.toString() === classDelete);
  const newClassData = classes.filter((sub) => sub.id.toString() !== classDelete);

  if (!classDelete || !existClass) {
    res.status(404).send('ID are not found');
    return;
  }

  fs.writeFile('src/data/class.json', JSON.stringify(newClassData, null, 2), (error) => {
    if (error) {
      res.status(500).send('Class cannot be deleted');
    } else {
      res.send('Class has been deleted');
    }
  });
});

module.exports = router;
