const express = require('express');
const fs = require('fs');

const classes = require('../data/subscription.json');

const router = express.Router();

// Create subscription

router.post('/create', (req, res) => {
  const newSubscription = req.body;
  const requireProps = ['id', 'class', 'date'];
  const isValid = Object.keys(newSubscription).every((prop) => requireProps.includes(prop));
  const id = +newSubscription.id;

  if (isValid) {
    if (!Number.isNaN(id)) {
      classes.push(newSubscription);
      fs.writeFile('src/data/subscription.json', JSON.stringify(classes, null, 2), (error) => {
        if (error) {
          res.status(401).send('Subscription cannot be created');
        } else {
          res.status(200).send('Subscription created');
        }
      });
    } else {
      res.send('Invalid ID');
    }
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
    res.send('ID has be a number');
    return;
  }

  if (!exist) {
    res.send('ID are not found');
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
