const express = require('express');
const fs = require('fs');

const classes = require('../data/subscription.json');

const router = express.Router();

// Create subscription

router.post('/create', (req, res) => {
  const newSubscription = req.body;
  const requireProps = ['id', 'activity', 'date'];
  const isValid = Object.keys(newSubscription).every((prop) => requireProps.includes(prop));
  const idClass = newSubscription.id;
  const nameClass = newSubscription.activity;
  const dateClass = newSubscription.date;
  const onlyLetters = /^[a-zA-Z]+$/;
  const formatDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (isValid) {
    if (typeof idClass !== 'number') {
      res.status(422).send('ID has to be a Number');
      return;
    }
    if (!onlyLetters.test(nameClass)) {
      res.status(422).send('Activity has to be letters');
      return;
    }
    if (String(nameClass).length < 4) {
      res.status(422).send('Minimum character for name is 4');
      return;
    }
    if (!formatDate.test(dateClass)) {
      res.status(422).send('Format date has to be a mm/dd/year');
      return;
    }

    classes.push(newSubscription);
    fs.writeFile('src/data/subscription.json', JSON.stringify(classes, null, 2), (error) => {
      if (error) {
        res.status(401).send('Subscription cannot be created');
      } else {
        res.send('Subscription created');
      }
    });
  } else {
    res.status(404).send('Invalid subscription data');
  }
});

// Delete subscription

router.delete('/delete/:id', (req, res) => {
  const subscriptionDelete = req.params.id;
  const exist = classes.find((sub) => sub.id.toString() === subscriptionDelete);
  const subscriptionFind = classes.filter((sub) => sub.id.toString() !== subscriptionDelete);

  if (!exist) {
    res.status(422).send('ID are not found');
    return;
  }

  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptionFind, null, 2), (error) => {
    if (error) {
      res.status(401).send('Subscription cannot be deleted');
    } else {
      res.send('Subscription has been deleted');
    }
  });
});

// Get subscription

router.get('/:id', (req, res) => {
  const idSubscription = req.params.id;
  const exist = classes.filter((sub) => sub.id.toString() === idSubscription);

  if (exist.length === 0) {
    res.status(422).send('Subscritpion are not found');
  } else {
    res.send(exist);
  }
});

// Get subscription with filters

router.get('/', (req, res) => {
  const { id, activity, date } = req.query;
  const filterSubscription = classes.filter((sub) => sub.id.toString() === id
  && sub.activity.toString() === activity
  && sub.date.toString() === date);

  if (filterSubscription.length === 0) {
    res.status(422).send('Subscription are not found');
  } else {
    res.send(filterSubscription);
  }
});

// Edit subscription

router.put('/edit/:id', (req, res) => {
  const getId = req.params.id;
  const requireProps = ['id', 'activity', 'date'];
  const onlyLetters = /^[a-zA-Z]+$/;
  const formatDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const findId = classes.find((sub) => sub.id.toString() === getId);
  const newProps = Object.keys(req.body);
  const isDifferentProps = newProps.some((prop) => !requireProps.includes(prop));

  if (!findId) {
    res.status(422).send('Subscription are not found for edit');
    return;
  }

  if (isDifferentProps) {
    res.status(400).send('Cannot edit parameter names');
    return;
  }

  findId.activity = req.body.activity;
  findId.date = req.body.date;

  if (!onlyLetters.test(findId.activity)) {
    res.status(422).send('Activity has to be letters');
    return;
  }

  if (!formatDate.test(findId.date)) {
    res.status(422).send('Date format are invalid');
    return;
  }
  fs.writeFile('src/data/subscription.json', JSON.stringify(classes, null, 2), (error) => {
    if (error) {
      res.status(401).send('Subscription cannot be edited');
    } else {
      res.send('Subscription has been edited');
    }
  });
});
module.exports = router;
