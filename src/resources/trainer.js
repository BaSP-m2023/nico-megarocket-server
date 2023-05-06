import express from 'express';

import trainers from '../data/trainer.json';

const router = express.Router();

// get
router.get('/', (req, res) => {
  res.send(trainers);
});

export default router;
