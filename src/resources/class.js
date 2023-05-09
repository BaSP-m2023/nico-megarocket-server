const express = require('express');

const fs = require('fs');
const classes = require('../data/class.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const valid = classes.filter((obj) => obj.id.toString() === id);
  if (valid.length === 0) {
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

router.delete('/:id', (req, res) => {
  const classDelete = req.params.id;
  const existClass = classes.find((sub) => sub.id.toString() === classDelete);
  const newClassData = classes.filter((sub) => sub.id.toString() !== classDelete);

  if (!existClass) {
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
