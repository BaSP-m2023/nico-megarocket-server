const express = require('express');
const fs = require('fs');

const classes = require('../data/subscription.json');

const router = express.Router();

// Create subscription

router.post('/create', (req, res) => {
  const newSubscription = req.body;
  const requireProps = ['id', 'class', 'date'];
  const isValid = Object.keys(newSubscription).every((prop) => requireProps.includes(prop));
  const idClass = newSubscription.id;
  const nameClass = newSubscription.class;
  const dateClass = newSubscription.date;
  const onlyLetters = /^[a-zA-Z]+$/;
  const formatDate = /^\d{2}\/\d{2}\/\d{4}$/;

  if (isValid) {
    if (typeof idClass !== 'number') {
      res.status(422).send('ID has to be a Number');
      return;
    }
    if (!onlyLetters.test(nameClass)) {
      res.status(422).send('Class has to be letters');
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
        res.status(200).send('Subscription created');
      }
    });
  } else {
    res.status(404).send('Invalid subscription data');
  }
});

// Delete subscription

router.delete('/delete/:id', (req, res) => {
  const subscriptionDelete = req.params.id;
  const subscriptionNumber = +subscriptionDelete;
  const exist = classes.find((sub) => sub.id.toString() === subscriptionDelete);

  if (Number.isNaN(subscriptionNumber)) {
    res.status(422).send('ID has be a number');
    return;
  }

  if (!exist) {
    res.status(422).send('ID are not found');
    return;
  }

  const subscriptionFind = classes.filter((sub) => sub.id.toString() !== subscriptionDelete);

  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptionFind, null, 2), (error) => {
    if (error) {
      res.status(401).send('Subscription cannot be deleted');
    } else {
      res.status(200).send('Subscription has been deleted');
    }
  });
});

module.exports = router;
